import client from './client'


// Get posts
export const getPosts = () => {
	return client
			.get('post/')
			.then(({ data }) => {
				return data;
			})
}