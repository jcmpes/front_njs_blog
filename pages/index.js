import EmptyList from '../src/components/posts/EmptyList'
import Layout from '../src/components/layout/Layout';
import PostList from '../src/components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsData, getToken } from '../src/store/selectors';
import { useEffect } from 'react';
import { postsLoadAction, restoreToken } from '../src/store/actions';
import storage from '../src/utils/storage';

export default function Home() {

  const dispatch = useDispatch();
  const posts = useSelector(getPostsData);
  const access_token = storage.get('auth');
  const email = storage.get('email');

    if (access_token) {
        dispatch(restoreToken(access_token, email))
    }
  
  useEffect(() => {
    dispatch(postsLoadAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <Layout>
      {posts.length ? (
        <PostList
          posts={posts}
        />
      ) : (
        <EmptyList />
      )}
    </Layout>
  )
}