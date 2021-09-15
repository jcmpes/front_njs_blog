import client, { configureClient, resetClient } from './client'

// Register
export const register = (userData) => {
    return client
        .post('/users/signup/', userData, {
            headers: {
                'Content-Type': "application/json;charset=UTF-8"
            }
        })
        .then(data => console.log(data))
        .catch(error => error)
}