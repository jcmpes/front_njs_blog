import client from './client';

// Get posts
export const getPosts = (token) => {
  const headers = {
    Authorization: `Token ${token}`,
  };
  return client.get('post/', headers).then(({ results }) => {
    return results;
  });
};
