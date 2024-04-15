import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from './page'
import HomeLayout from './layout'

describe('Home page with HomeLayout', () => {

    let oldFetch

    beforeAll(() => {
        oldFetch = global.fetch
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                {
                    "id": 1,
                    "name": "Taxes",
                    "ownerLogin": "secstoreuser",
                    "publicid": "pid001"
                },
                {
                    "id": 2,
                    "name": "Documents",
                    "ownerLogin": "secstoreuser",
                    "publicid": "pid002"
                },
                {
                    "id": 3,
                    "name": "Kids",
                    "ownerLogin": "secstoreuser",
                    "publicid": "pid003"
                },
                {
                    "id": 4,
                    "name": "Work",
                    "ownerLogin": "secstoreuser",
                    "publicid": "pid004"
                }
            ])
        }))
   })

    afterAll(() => {
        global.fetch = oldFetch
    })

    it('Renders the home page with its layout',  async () => {
        render(await HomeLayout({children: await HomePage()}))
        expect(screen.queryByTestId('menuBarsIcon')).toBeInTheDocument()
        expect(screen.queryByTestId('logoutButtonIcon')).toBeInTheDocument()
        expect(screen.queryByTestId('sideBarListOptions')).toBeInTheDocument()
        expect(screen.queryByTestId('pailList')).toBeInTheDocument()
    })

})