import { ToggleButton } from './toggleButton'

export default {
    title: 'SecureStore/ToggleButton',
    component: ToggleButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    }
}

export const ToggleOn = {
    args: {
        toggleOn: true
    }
}

export const ToggleOff = {
    args: {
        toggleOn: false
    }
}