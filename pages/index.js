import { InferGetStaticPropsType } from 'next';
import Navbar from '../src/components/layout/Navbar';
import Article from '../src/components/posts/Article';

import Layout from '../src/components/layout/Layout';
import PostList from '../src/components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsData, getToken } from '../src/store/selectors';
import { useEffect, useState } from 'react';
import { postsLoadAction } from '../src/store/actions';
import compareValues from '../src/utils/compareValues';

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(getPostsData);
  const token = useSelector(getToken);
  
  useEffect(() => {
    dispatch(postsLoadAction(token));
  }, []);

  

  return (
    <Layout>
      {posts.length ? (
        <PostList
          posts={posts}
        />
      ) : (
        'No posts'
      )}
    </Layout>
  )
}