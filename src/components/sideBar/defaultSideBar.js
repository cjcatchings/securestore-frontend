import SidebarList from "./sidebarList"

export default function DefaultSideBar({primary, ...otherProps}){

    const background = primary ? 'bg-slate-300' : 'bg-slate-400'

    return (
        <div className={`${background} w-[200px] float-left`}>
            <SidebarList />
        </div>
    )
}