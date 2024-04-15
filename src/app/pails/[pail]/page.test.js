import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PailsPage from './page'
import PailsLayout from '../layout'

describe('PailsPage', () => {

    let oldFetch

    beforeAll(() => {
        oldFetch = global.fetch
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                subFolders: ['2020', '2021', '2022']
            })
        }))
   })

    afterAll(() => {
        global.fetch = oldFetch
    })

    it('Renders a pails page', async () => {
        render(await PailsLayout({children: await PailsPage({params: {pail: "Taxes"}})}))
        expect(screen.queryByTestId('pailLabel')).toHaveTextContent('Taxes')
    })
})