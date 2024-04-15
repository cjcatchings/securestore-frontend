import { Directory } from '@/components/directory/dirItem'
import { getFolderDetail } from '@/services/folder/folderService'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID

export default async function PailsPage({params}){

    if(!cookies().has(AUTH_COOKIE_NAME)){
        redirect("/login")
    }
    const accessToken = cookies().get(AUTH_COOKIE_NAME).value
    const { pail, ...otherParams } = params

    const folderDetail = await getFolderDetail(accessToken, pail, '')

    return (
        <div className="h-full min-h-screen bg-white flex-grow">
            <section className="pt-2">
                <h1 className="text-2xl pl-2" data-testid="pailLabel">{pail}</h1>
                <p className="h-0.5 pb-2 border-solid border-b-4 mx-2" />
                <div className="flex flex-col flex-wrap pt-2">
                    <Directory 
                        key="!parent"
                        folderName=".."
                        linkPath="/home" />
                    {folderDetail.subFolders
                        .map(fd => <Directory 
                                        key={`${fd}`} 
                                        folderName={fd} 
                                        linkPath={`/pails/${pail}/${fd}`}/>
                        )}
                </div>
            </section>
        </div>
    )

}