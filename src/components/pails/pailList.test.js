import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { PailList } from './pailList'

describe('PailList', () => {

    const samplePails = [
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
    ]

    it('Renders the list of pails', () => {
        render(<PailList pails={samplePails} />)
        const pailList = screen.queryByTestId('pailList')
        expect(pailList.children).toHaveLength(samplePails.length)
    })
})