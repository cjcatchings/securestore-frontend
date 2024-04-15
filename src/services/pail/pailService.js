import { redirect } from 'next/navigation'

const BACKEND_URL = process.env.BACKEND_URL;

export async function getPails(authToken){

    const resp = await fetch(`${BACKEND_URL}/pails`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })

    if(!resp.ok){
        if(resp.status === 403){
            redirect("/login?action=doLogout")
        }else{
            throw new Error("Failed to fetch pails.")
        }
    }
    
    return resp.json();
}