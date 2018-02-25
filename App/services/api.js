// This is for our own backend api
import { AsyncStorage } from 'react-native'

export function makeApiClient(config) {
    const { host, port } = config

    return async (path, options) => {
        let token = ''

        try {
            token = await AsyncStorage.getItem('@letsunite:jwt', token)
        } catch (err) {
            console.error(err)
        }

        const defaultHeaders = {
            'Authorization': token && `Bearer ${token}`,
        }

        return fetch(`${host}/api/${path}`, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        })
    }
}

export const apiClient = makeApiClient({
    host: 'https://letsunite.io',
})