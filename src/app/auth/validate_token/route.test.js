import '@testing-library/jest-dom'
import { POST } from './route'
import { headers } from 'next/headers'

describe('auth/validateToken', () => {

    let oldFetch

    function mockHeadersImpl(withAuthHeader, authHeaderValid){
        let authHeader
        if(!withAuthHeader || !authHeaderValid){
            authHeader = ""
        }else{
            authHeader = "Bearer validtoken"
        }
        return () => {
            return {
                has: jest.fn().mockReturnValue(withAuthHeader),
                get: jest.fn().mockReturnValue(authHeader)
        }}
    }

    beforeAll(() => {
        oldFetch = global.fetch
        headers.mockImplementation(mockHeadersImpl(true, true))
    })

    afterAll(() => {
        global.fetch = oldFetch
    })

    function setGlobalFetch(authenticated, isOk, name, noAuthReason){
        const respObj = {
            authenticated: authenticated
        }
        if(authenticated){
            respObj.name = name
        }else{
            respObj.reason = noAuthReason
        }
        global.fetch = jest.fn().mockResolvedValue({
            ok: isOk,
            json: jest.fn().mockResolvedValue(respObj)
        })
    }

    it('Test validation of a valid access token in the Auth header', async () =>{
        setGlobalFetch(true, true, 'name', null)
        const resp = await POST({})
        expect(resp.body.authenticated).toBeTruthy()
    })

    it('Test validation of a missing access token in the Auth header', async () =>{
        headers.mockImplementation(mockHeadersImpl(false, false))
        setGlobalFetch(false, true, null, "VALID TOKEN NOT FOUND")
        const resp = await POST({})
        expect(resp.body.authenticated).toBeFalsy()
    })

    it('Test validation of a valid access token in the Auth header', async () =>{
        headers.mockImplementation(mockHeadersImpl(true, false))
        setGlobalFetch(false, true, null, "VALID TOKEN NOT FOUND")
        const resp = await POST({})
        expect(resp.body.authenticated).toBeFalsy()
    })
})