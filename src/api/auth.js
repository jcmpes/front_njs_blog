import client, { configureClient } from './client';
import storage from '../utils/storage';
import token from 'basic-auth-token';

// Register
export const register = (userData) => {
  return client
    .post('/users/signup/', userData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    .then((data) => data)
    .catch((error) => error);
};

// Login
export const login = (credentials) => {
    // Generate HTTP Basic Auth
    // const { email, password } = credentials
    // const basic_token = token(email, password)

  return client
    .post('users/login/', credentials)
    .then(({ user, access_token }) => {
        // Uncommento for Token auth
        configureClient(access_token);

        // Comment line below for Token Auth
        // configureClient(access_token, basic_token)
      if (credentials.remember) {
        storage.set('auth', access_token);
        storage.set('email', user.email);
      }
      return { user, access_token };
    });
};
