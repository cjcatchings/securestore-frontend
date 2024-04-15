import '@testing-library/jest-dom'
import { POST } from './route'

const accessToken = "accesstoken"
const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID

describe('auth/authn', () => {

    let oldFetch

    beforeAll(() => {
        oldFetch = global.fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                access_token: accessToken
            })
        })
    })

    afterAll(() => {
        global.fetch = oldFetch
    })

    function mockRequest(){
        return {
            json: () => Promise.resolve({
                username: 'username',
                password: 'password'
            })
        }
    }

    it("Executes the authService method associated with auth/authn", async () => {
        const resp = await POST(mockRequest())
        expect(resp.body.access_token).toBe(accessToken)
        expect(resp.cookies.get(AUTH_COOKIE_NAME).value).toBe(accessToken)
        expect(resp.cookies.get(AUTH_COOKIE_NAME).maxAge).toBe(3600)

    })

})