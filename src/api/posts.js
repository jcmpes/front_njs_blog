import { toast } from 'react-toastify';
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

// New post
export const newPost = (postData, token) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	return client.post('post/', postData, headers).then(response => {
		return response;
	});
};

// Delete post
export const deletePost = (id, token) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	return client.delete(`delete/${id}/`, headers).catch(err => toast.error('Unauthorized'))	
}