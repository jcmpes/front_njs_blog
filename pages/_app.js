import React from 'react';
import { Provider } from 'react-redux';
import client, { configureClient } from '../src/api/client';
import configureStore from '../src/store';
import storage from '../src/utils/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css';

const access_token = storage.get('auth');

if (!!access_token) {
  configureClient({ access_token });
}


const initialState = {
  auth: {
    isLogged: false,
    user: '',
    token: '',
  },
  posts: {
    loaded: false,
    data: [],
  },
};

const store = configureStore(initialState);
function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />;
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </Provider>

    )
}

export default MyApp;
