import '@testing-library/jest-dom'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ToggleButton } from './toggleButton'

describe('ToggleButton', () => {
    
    it('Renders a toggle button with toggle initially on', async () => {
        render(<ToggleButton toggleOn />)
        let toggleCircle = screen.queryByTestId("toggleCircle")
        let toggleClickArea = screen.queryByTestId("toggleClickArea")
        expect(toggleCircle).toHaveClass("ml-0")
        await act(() => {
            fireEvent.click(toggleClickArea)
        })
        expect(toggleCircle).toHaveClass("ml-6")
    })

    it('Renders a toggle button with toggle intitally off', async () => {
        render(<ToggleButton />)
        let toggleCircle = screen.queryByTestId("toggleCircle")
        let toggleClickArea = screen.queryByTestId("toggleClickArea")
        expect(toggleCircle).toHaveClass("ml-6")
        await act(() => {
            fireEvent.click(toggleClickArea)
        })
        expect(toggleCircle).toHaveClass("ml-0")
    })
})