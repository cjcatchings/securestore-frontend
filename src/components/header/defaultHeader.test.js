import { DefaultHeader } from "./defaultHeader"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('DefaultHeader', () => {
    it('Renders the default header', () => {
        render(<DefaultHeader />)
        expect(screen.queryByTestId('menuBarsIcon')).toBeInTheDocument()
        expect(screen.queryByTestId('logoutButtonIcon')).toBeInTheDocument()
    })
})