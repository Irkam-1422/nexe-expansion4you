import {createContext} from 'react'

function noop() {}

export const EditContext = createContext({
    action: 'unset'
})