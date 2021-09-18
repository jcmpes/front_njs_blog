import axios from 'axios';

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

const setAuthorizationHeader = (token) => {
    // client.defaults.headers.common['Authorization'] = `Token ${token}`;
    // Add a request interceptor
    client.interceptors.request.use(function (config) {
        // Uncomment for Token auth
        // config.headers.Authorization = `Token ${token}`;

        // Comment line below for Token Auth
        config.headers.Authorization = `Basic ${token}`;

        return config;
    });
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

// Add a response interceptor
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
    return Promise.reject({
      message: error.response.statusText,
      ...error.response,
      ...error.response.data,
    });
  },
);



export const configureClient = (access_token, basic_token) => {
// Uncomment for Token auth
    //   if (access_token) {
//     setAuthorizationHeader(access_token);
//   }

// Comment if clause below for Token Auth
  if (basic_token) {
      setAuthorizationHeader(basic_token);
  }
};

export const resetClient = () => {
  removeAuthorizationHeader();
};

export default client;