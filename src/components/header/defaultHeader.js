import { LogoutButtonIcon } from "@/resources/icons/loginLogout";
import { MenuBars4 } from "@/resources/icons/menuBars";
import PropTypes from 'prop-types';

export const DefaultHeader = ({primary, ...props}) => {

    const headerColor = primary ? 'bg-blue-400' : 'bg-green-700'

    return (
        <header className="w-full">
            <div className={`flex items-center justify-between h-12 ${headerColor} z-`}>
                <div className="max-w-[40px] ml-4">
                    <MenuBars4 dataTestId="menuBarsIcon" />
                </div>
                <div className="w-auto">Home</div>
                <div className="max-w-[40px] mr-4">
                    <LogoutButtonIcon dataTestId="logoutButtonIcon"/>
                </div>
            </div>
        </header>
    )
}

DefaultHeader.propTypes = {
    primary: PropTypes.bool
}