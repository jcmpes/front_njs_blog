import { toast } from 'react-toastify';
import client from './client';

// Get posts
export const getPosts = () => {
  return client.get('post/').then(({ results }) => {
    return results;
  });
};

// New post
export const newPost = (postData) => {
	const headers = {
		'Content-Type': 'multipart/form-data',
	};
	console.log(token)
	return client
		.post('post/', postData, headers)
		.then(response => response)
		.catch(err => err)
};

// Delete post
export const deletePost = (id) => {
	return client.delete(`delete/${id}/`).catch(err => toast.error('Unauthorized'))	
}