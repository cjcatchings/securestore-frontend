/**
 * @jest-environment node
 */
import { middleware } from './middleware'

describe('middleware', () => {

    beforeAll(() => {
        jest.mock('next/headers')
        jest.mock('next/server', () => ({
            ...jest.requireActual('next/server'),
            NextRequest: jest.fn().mockImplementation(req => ({
                nextUrl: {
                    clone: jest.fn().mockReturnValue({
                        pathname: req.pathname,
                        search: req.search
                    }),
                    pathname: req.pathname,
                    searchParams: {
                        get: jest.fn().mockImplementation(param => "action" && req.search.action)
                    }
                },
                headers: {
                    get: jest.fn().mockImplementation(key => key === 'host' && req.host)
                }
            }))
        }))
    })

    function setGlobalFetchCookieState(validCookie){
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                authenticated: validCookie,
                name: 'name'
            })
        })
    }

    function mockRequest(authenticated, params){
        const req = {
            params: params
        }
        req.nextUrl = {
            pathname: '/',
            searchParams: {
                get: jest.fn().mockImplementation(param =>  req.params[param])
            }
        }
        req.cookies = {
            get: jest.fn().mockImplementation(cookie => authenticated && {value: "someCookie"})
        }
        req.url = 'http://localhost:3000/'
        return req
    }

    it("Tests redirection of an unauthenticated user to the login page", async () => {
        const req = mockRequest(false, {})
        setGlobalFetchCookieState(true)
        const resp = await middleware(req)
        expect(resp.headers.get('location')).toBe('http://localhost:3000/login')
    })

    it("Tests redirection of an authenticated user to the fantasy football dashboard", async () => {
        const req = mockRequest(true, {})
        setGlobalFetchCookieState(true)
        const resp = await middleware(req)
        expect(resp.headers.get('location')).toBe('http://localhost:3000/home')
    })

    it("Tests redirection of a user with an expired JWT token to the login page", async () => {
        const req = mockRequest(true, {})
        setGlobalFetchCookieState(false)
        const resp = await middleware(req)
        expect(resp.headers.get('location')).toBe('http://localhost:3000/login?action=doLogout')
        setGlobalFetchCookieState(true)
    })

    it("Tests redirection to the login page based on logout action", async () => {
        const req = mockRequest(true, {})
        req.params.action = 'doLogout'
        const resp = await middleware(req)
        expect(resp.headers.get('location')).toBe('http://localhost:3000/login')
    })

})