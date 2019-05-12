import { createClient, Action } from 'react-fetching-library'

// Often the host endpoint would be hidden in evironment variables
const HOST = 'https://teamtreehouse.com/jonathanwalz.json'

export const requestHostInterceptor = (host: string) => () => async (action: Action) => {
    return {
        ...action,
        endpoint: `${host}${action.endpoint}`,
    }
}

export const Client = createClient({
    requestInterceptors: [ requestHostInterceptor(HOST) ],
})
