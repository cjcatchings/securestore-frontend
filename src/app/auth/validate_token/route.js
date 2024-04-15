import { NextResponse } from 'next/server'
import { validateUserToken } from '@/services/auth/authService'
import { headers } from "next/headers";

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID;

const TOKEN_NOT_FOUND_RESP = {
    authenticated: false,
    reason: "VALID TOKEN NOT FOUND"
}

export async function POST(request){
    if(!headers().has("Authorization")){
        return NextResponse.json(TOKEN_NOT_FOUND_RESP);
    }
    const authHeader = headers().get("Authorization").split(' ');
    if(authHeader.length !== 2 || authHeader[0] !== 'Bearer'){
        return NextResponse.json(TOKEN_NOT_FOUND_RESP);
    }
    const currentAccessToken = authHeader[1];
    const tokenValidationResult = await validateUserToken(currentAccessToken, false, false);
    const response = NextResponse.json(tokenValidationResult)
    if(!tokenValidationResult.authenticated){
        response.headers.set("Set-Cookie", `${AUTH_COOKIE_NAME}=;Max-Age=0;SameSite=None;Secure`);
    }
    return response;
}
