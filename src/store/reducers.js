import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
} from './types';

export const initialState = {
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

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        isLogged: true,
        user: action.payload.user,
        token: action.payload.access_token,
      };
		case AUTH_LOGOUT:
			return {
				isLogged: false
			}
    default:
      return state;
  };
};

export function posts(state = initialState.posts, action) {
  switch (action.type) {
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        data: action.payload,
      };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  };
};
