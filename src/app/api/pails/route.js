import { NextResponse } from 'next/server'
import { getPails } from '@/services/pail/pailService'
import { cookies } from 'next/headers'

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID

export async function GET(request){
    const accessToken = cookies().get(AUTH_COOKIE_NAME).value
    const pails = await getPails(accessToken)
    return NextResponse.json(pails)
}