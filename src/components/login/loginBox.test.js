import LoginBox from "./loginBox"
import '@testing-library/jest-dom'
import { render, screen, act, fireEvent } from '@testing-library/react'

describe('LoginBox', () => {
    const loginFn = jest.fn().mockImplementation((e) => {
        e.preventDefault()
    })
    it('renders the login box', () => {
        render(<LoginBox loginFn={loginFn} loginState="Welcome" />)
        const loginUsername = screen.queryByTestId('loginUsername')
        const loginPassword = screen.queryByTestId('loginPassword')
        const loginBtn = screen.queryByTestId('loginSubmitBtn')
        expect(loginUsername).toBeInTheDocument()
        expect(loginPassword).toBeInTheDocument()
        expect(loginFn).not.toHaveBeenCalled()
        act(() => {
            fireEvent.change(loginUsername, {target: {value: 'username'}})
            fireEvent.change(loginPassword, {target: {value: 'password'}})
        })
        expect(loginBtn).toBeEnabled()
        act(() => {
            fireEvent.click(loginBtn)
        })
        expect(loginFn).toHaveBeenCalled()
    })
})