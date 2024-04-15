import { PailList } from '@/components/pails/pailList'
import { cookies } from 'next/headers'
import { getPails } from '@/services/pail/pailService'
import { redirect } from 'next/navigation'

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID

export default async function HomePage(){


    if(!cookies().has(AUTH_COOKIE_NAME)){
        redirect("/login")
    }
    const accessToken = cookies().get(AUTH_COOKIE_NAME).value
    const pails = await getPails(accessToken)

    return(
        <div className="h-full min-h-screen bg-white flex-grow">
            <section className="pt-2">
                <h1 className="text-2xl pl-2">My Pails</h1>
                <p className="h-0.5 pb-2 border-solid border-b-4 mx-2" />
                <PailList pails={pails} />
            </section>
        </div>
    )

}