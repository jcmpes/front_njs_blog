import client, { configureClient, resetClient } from './client'
import storage from '../utils/storage'

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

// Login
export const login = (credentials) => {
    return client
        .post('users/login/', credentials)
        .then(({ user, access_token }) => {
            configureClient({ access_token });
            if (credentials.remember) {
                storage.set('auth', access_token);
            }
            return user;
        })
}