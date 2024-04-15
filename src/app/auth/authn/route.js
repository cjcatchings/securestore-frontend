import { NextResponse } from 'next/server'
import { authenticateUser } from '@/services/auth/authService'

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID

export async function POST(request){
    const requestJson = await request.json();
    const authResp = await authenticateUser(requestJson.username, requestJson.password);
    const respJson = NextResponse.json(authResp);
    respJson.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: authResp.access_token,
        maxAge: 60*60, // TODO:  Make configurable
        sameSite: 'none',
        secure: true
    })
    return respJson;
}
