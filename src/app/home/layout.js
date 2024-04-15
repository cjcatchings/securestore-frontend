import { DefaultHeader } from "@/components/header/defaultHeader"
import DefaultSideBar from "@/components/sideBar/defaultSideBar"

export default function HomeLayout({children}){
    return(
        <div className="flex flex-wrap">
            <DefaultHeader primary />
            <DefaultSideBar />
            {children}
        </div>

    )
}