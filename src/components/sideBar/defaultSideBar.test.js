import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DefaultSideBar from './defaultSideBar'
import { usePathname } from 'next/navigation'

describe('DefaultSideBar', () => {

    beforeEach(() => {
        usePathname.mockReset()
    })

    it('Renders the default side bar as if the user is not on the home page', () => {
        usePathname.mockReturnValue('/nothome')
        render(<DefaultSideBar />)
        let linkList = screen.getByTestId('sideBarListOptions')
        expect(linkList.children).toHaveLength(4)
    })

    it('Renders the default side bar as if the user is on the home page', () => {
        usePathname.mockReturnValue('/home')
        render(<DefaultSideBar />)
        let linkList = screen.getByTestId('sideBarListOptions')
        expect(linkList.children).toHaveLength(3)
    })
})