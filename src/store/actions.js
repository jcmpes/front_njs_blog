import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  RESTORE_TOKEN,
} from './types';

import { toast } from 'react-toastify';
import { login } from '../api/auth';
import { getPostsLoaded } from './selectors';
import { deletePost, getPosts, newPost } from '../api/posts';
import { resetClient } from '../api/client';
import storage from '../utils/storage';

/**
 * AUTH ACTIONS
 */
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

// Logout action
export const authLogout = () => {
  resetClient();
  const sessionToken = storage.get('auth');
  if (sessionToken) {
    storage.remove('auth');
    storage.remove('email');
  }
  toast.warning(`Bye bye 👋`);
  return {
    type: AUTH_LOGOUT,
  };
};

// Restore token action
export const restoreToken = (token, email) => {
  return {
    type: RESTORE_TOKEN,
    payload: { token, email },
  };
};

// Log in thunk middleware
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

/**
 * LOAD POSTS ACTIONS
 */
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
      const results = await getPosts(token);
      dispatch(postsLoadSuccess(results));
    } catch (error) {
      dispatch(postsLoadFailure(error));
    }
  };
};

/**
 * CREATE A NEW POST ACTIONS
 */
export const newPostRequest = () => {
  return {
    type: NEW_POST_REQUEST,
  };
};

export const newPostSuccess = (post) => {
  return {
    type: NEW_POST_SUCCESS,
    payload: post,
  };
};

export const newPostFailure = (error) => {
  return {
    type: NEW_POST_FAILURE,
    payload: error,
    error: true,
  };
};

export const newPostAction = (postData, history, token) => {
  return async function (dispatch, getState) {
    dispatch(newPostRequest());
    try {
      const createdPost = await newPost(postData, token);
      if (createdPost.published) {
        const toastOptions = {
          onClose: () => history.push('/'),
          autoClose: 2000,
        };
        dispatch(newPostSuccess(createdPost));
        toast.success('🦄 Wow so easy!', toastOptions);
        // Redirect with history
        return createdPost;
      } else {
        if (createdPost.title) {
          const error = createdPost.title[0];
          toast.error(`Title: ${error}`);
        }
        if (createdPost.body) {
          const error = createdPost.body[0];
          toast.error(`Body: ${error}`);
        }
        if (createdPost.image) {
            const error = createdPost.image[0];
            toast.error(`Image: ${error});
        }
      }
    } catch (error) {
      dispatch(newPostFailure(error));
    }
  };
};

/**
 * DELETE POST ACTIONS
 */
export const deletePostRequest = () => {
  return {
    type: DELETE_POST_REQUEST,
  };
};

export const deletePostSuccess = (id) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: id,
  };
};

export const deletePostFailure = (error) => {
  return {
    type: DELETE_POST_FAILURE,
    payload: error,
    error: true,
  };
};

export const deletePostAction = (id, token, history) => {
  return async function (dispatch, getState) {
    dispatch(deletePostRequest());
    try {
      await deletePost(id, token);
      dispatch(deletePostSuccess(id));
      toast.warning(`It's gone 👋`);
    } catch (error) {
      dispatch(deletePostFailure(error));
    }
  };
};
