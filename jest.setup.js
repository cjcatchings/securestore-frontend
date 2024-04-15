import '@testing-library/jest-dom'
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

jest.mock('next/navigation', () => {
    return {
        useRouter: jest.fn().mockImplementation(() => {
            return {
                prefetch: jest.fn(),
                push: jest.fn()
            }
        }),
        usePathname: jest.fn()
    }
})

jest.mock('next/server', () => {
    NextResponse: {
        json: jest.fn()
    }
})

jest.mock('next/headers', () =>{
    return {
        headers: jest.fn(),
        cookies: jest.fn().mockImplementation(() => {
            return {
                has: jest.fn().mockReturnValue(true),
                get: jest.fn().mockImplementation(() => {
                    return {
                        value: ''
                    }
                })
            }
        })
    }
})

class Headers{
    constructor(headers){
        this._headerMap = headers || {}
    }
    setSetCookie(c){
        this._headerMap.setcookie = c
    }
    getSetCookie(){
        return this._headerMap.setcookie
    }
    set(name, value){
        this._headerMap[name.toLowerCase()] = value
    }
    get(name){
        return this._headerMap[name.toLowerCase()]
    }
    delete(name){
        delete this._headerMap[name]
    }
    append(name, value){
        if(name in this._headerMap){
            this._headerMap[name] += `, ${value}`
        }else{
            this._headerMap[name] = value
        }
    }
    forEach(callback, thisArg){
        for(let name in this._headerMap){
            if(this._headerMap.hasOwnProperty(name)){
                callback.call(thisArg, this._headerMap[name], name, this)
            }
        }
    }
}
global.Headers = Headers

class Response{
    constructor(_body, _init){
        this.body = _body
        this.headers = new Headers()
        if(_init && _init.headers){
            Object.getOwnPropertyNames(_init.headers._headerMap).forEach(hn => {
                this.headers.set(hn, _init.headers._headerMap[hn])
            })
        }
    }
    static error(){}
    static redirect(){
    }
    get headers(){
        return this._headers
    }
    set headers(hs){
        this._headers = hs
    }
    clone(){}
    json(){
        return JSON.parse(this.body)
    }
    static json(_body, _init){
        return new Response(_body, _init)
    }
}
global.Response = Response