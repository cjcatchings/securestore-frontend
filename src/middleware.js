import { NextResponse } from 'next/server';
import { validateUserToken } from '@/services/auth/authService';

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID;

//TODO need to fix redirect to fantasyfootball if logged in (currently routes to main page)
export async function middleware(request){
    const doLogout = request.nextUrl.searchParams.get("action") === "doLogout";
    const currentAccessToken = doLogout ? null : request.cookies.get(AUTH_COOKIE_NAME);
    //If an access token is in cookies and user is not trying to log out, try to validate
    if(currentAccessToken && !doLogout){
        const tokenValidationResult = await validateUserToken(currentAccessToken.value, false, false);
        /**
         * Token is valid.  
         * 
         * 1.  If URL is login or home/index, re-direct to /fantasyfootball
         * 2.  If URL is to an API route, set the X-Full-Name and X-url response headers
         */
        if(tokenValidationResult.authenticated){
            if(request.nextUrl.pathname==="/login"
                || request.nextUrl.pathname==="/"
                || request.nextUrl.pathname===""){
                /* User is still authenticated, redirect to home page */
                const resp = NextResponse.redirect(new URL('/home', request.url));
                //resp.headers.set("X-Full-Name", tokenValidationResult.name);
                return resp;
            }
            const resp = NextResponse.next();
            return resp;
        }else{
            /**
             *  Token is not valid.  Perform logout and delete the token from cookies.
             *  
             */
            //Maybe move to service?
            const redirectResposne = NextResponse.redirect(new URL('/login?action=doLogout', request.url));
            redirectResposne.headers.set("Set-Cookie", `${AUTH_COOKIE_NAME}=;Max-Age=0;SameSite=None;Secure`);
            return redirectResposne;
        }
    //We are explicitly trying to log out (probably by calling /login?action=doLogout)
    }else if(doLogout){
        const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
        redirectResponse.headers.set("Set-Cookie", `${AUTH_COOKIE_NAME}=;Max-Age=0;SameSite=None;Secure`);
        return redirectResponse;
    //If no access token exists, check if we are trying to obtain one.  If not, go to login page.
    }else if(request.nextUrl.pathname!=='/auth/authn'
        && request.nextUrl.pathname!=='/login'){
        return NextResponse.redirect(new URL('/login', request.url));
    };
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|logout|health|home|pails).*)'
    ]
}
