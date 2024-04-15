import '@testing-library/jest-dom'
import { render, screen, act, fireEvent } from '@testing-library/react'
import Login from './page'

describe('Login', () => {

    let oldFetch
    let loginSuccess = true

    beforeAll(() => {
        oldFetch = global.fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                loginStatus: loginSuccess ? 'SUCCESS' : 'FAILED'
            })
        })
    })

    afterAll(() => {
        global.fetch = oldFetch
    })

    it('Loads the login page', async () => {
        render(<Login />)
        const loginUsername = screen.queryByTestId('loginUsername')
        const loginPassword = screen.queryByTestId('loginPassword')
        const loginBtn = screen.queryByTestId('loginSubmitBtn')
        expect(loginUsername).toBeInTheDocument()
        expect(loginPassword).toBeInTheDocument()
        expect(global.fetch).not.toHaveBeenCalled()
        act(() => {
            fireEvent.click(loginBtn)
        })
        expect(global.fetch).not.toHaveBeenCalled()
        await act(() => {
            fireEvent.change(loginUsername, {target: {value: 'username'}})
            fireEvent.change(loginPassword, {target: {value: 'password'}})
            fireEvent.click(loginBtn)
        })
        expect(global.fetch).toHaveBeenCalled()
        loginSuccess = true
        await act(() => {
            fireEvent.change(loginUsername, {target: {value: 'badUsername'}})
            fireEvent.change(loginPassword, {target: {value: 'badPassword'}})
            fireEvent.click(loginBtn)
        })
        expect(global.fetch).toHaveBeenCalledTimes(2)

    })

})