'use client'

import * as React from 'react';
import LoginBox from "@/components/login/loginBox";
import { useRouter } from 'next/navigation';
import useDarkModeToggle from '@/themes/useDarkModeToggle';

export default function Login() { 

    const router = useRouter()
    const [ loginState, setLoginState ] = React.useState('Welcome')
    const [ darkMode, toggleDarkMode ] = useDarkModeToggle()

    const login = React.useCallback((e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const username = formData.get("username") || ''
        const password = formData.get("password") || ''
        const rememberMe = formData.get("rememberMe") == "on"

        if(username === '' || password === ''){
            console.warn('No data provided.  Not doing anything.')
            return
        }

        setLoginState('Logging in...')
        fetch("/auth/authn", {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((resp) => resp.json())
        .then((authJson) => {
            if(authJson.access_token){
                setLoginState('Success')
                router.push('/home')
            }else{
                setLoginState('Failed - User')
            }
        }).catch((error) => {
            console.error((error))
            setLoginState('Failed - Server')
        })
    }, [router]);

    return (
        <>
            <header className="dark:bg-black" />
            <main className="h-full min-h-screen px-8 py-12 dark:bg-black">
                <LoginBox loginFn={login} loginState={loginState} />
            </main>
        </>
    )
}