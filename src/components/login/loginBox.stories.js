import LoginBox from "./loginBox"

export default {
    title: 'SecureStore/LoginBox',
    component: LoginBox,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
}

export const LightMode = {
    args: {
        loginState: 'Welcome'
    }
}