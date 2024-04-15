import { PailList } from "./pailList"

export default {
    title: 'SecureStore/PailList',
    component: PailList,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded'
    }
}

export const NoPaging = {
    args: {
        pails: [
            {_id: 1, name: 'Taxes'},
            {_id: 2, name: 'Documents'},
            {_id: 3, name: 'Kids'},
            {_id: 4, name: 'Work'}
        ]
    }
}