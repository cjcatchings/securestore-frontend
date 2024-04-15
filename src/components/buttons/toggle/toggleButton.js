'use client'

import { useState, useRef } from 'react'
import PropTypes from 'prop-types';

export const ToggleButton = ({toggleOn, ...props}) => {

    const [ toggled, setToggled ] = useState(toggleOn)
    const toggleCircle = useRef(null)

    const executeToggle = () => {
        toggleCircle.current.style.marginLeft = toggled ? '1.5rem': '0'
        setToggled(t => !t)
    }

    //0-6
    return(
        <div className={`w-14 h-8 flex items-center space-between border-2 border-black border-solid rounded-full relative`}>
            <div className="w-14 h-8 absolute rounded-full" onClick={executeToggle} data-testid="toggleClickArea" />
            <div ref={toggleCircle} 
                className={`w-7 h-7 absolute border-2 ml-${toggled ? 0:6} inline-block border-black border-solid rounded-full z-10 transition-[margin-left] duration-200`} 
                data-testid="toggleCircle"/>
        </div>
    )
}

ToggleButton.propTypes = {
    toggleOn: PropTypes.bool
}
