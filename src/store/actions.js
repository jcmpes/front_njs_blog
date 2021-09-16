import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE
} from './types';

import { toast } from 'react-toastify';
import { login } from '../api/auth';
import { getPostsLoaded } from './selectors'
import { getPosts } from '../api/posts'

// Log in actions
export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
};

export const authLoginSuccess = (response) => {
  toast.success(`Hello, ${response.user.username}.`);
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: response,
  };
};

export const authLoginFailure = (error) => {
  toast.error(`Error: ${error.error}.`);
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
};

// Log in middleware
export const loginAction = (credentials, history, location) => {
  return async function (dispatch, getState) {
    dispatch(authLoginRequest());
    try {
      const response = await login(credentials);
      if (!response) {
        dispatch(authLoginFailure());
      } else {
        dispatch(authLoginSuccess(response));
      }
      // Redirect
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const postsLoadRequest = () => {
  return {
    type: LOAD_POSTS_REQUEST,
  };
};

export const postsLoadSuccess = (results) => {
  return {
    type: LOAD_POSTS_SUCCESS,
    payload: results,
  };
};

export const postsLoadFailure = (error) => {
  return {
    type: LOAD_POSTS_FAILURE,
    payload: error,
    error: true,
  };
};

export const postsLoadAction = (token) => {
  return async function (dispatch, getState) {
    const postsLoaded = getPostsLoaded(getState());
    if (postsLoaded) {
      return;
    }
    dispatch(postsLoadRequest());
    try {
      const results = await getPosts(token)
        dispatch(postsLoadSuccess(results));
    } catch (error) {
      dispatch(postsLoadFailure(error));
    }
  };
};
