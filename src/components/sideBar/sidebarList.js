'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function SidebarList(){

    const pathname = usePathname()

    return (
        <ul className="pl-1" data-testid="sideBarListOptions">
            {pathname !== '/home' ? <li className="pl-2 pt-2"><Link href="/home">Home</Link></li> : null}
            <li className="pl-2 pt-2">Favorites</li>
            <li className="pl-2 pt-2">Recents</li>
            <li className="pl-2 pt-2">Settings</li>
        </ul>
    )
}