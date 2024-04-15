import { useState } from 'react'

function useDarkModeToggle(){
    const [ darkMode, setDarkMode ] = useState(false)
    const toggleDarkMode = () => {
        if(darkMode){
            window.document.documentElement.classList.remove('dark')
        }else{
            window.document.documentElement.classList.add('dark')
        }
        setDarkMode(dm => !dm)
    }
    return [ darkMode, toggleDarkMode ]
}

export default useDarkModeToggle