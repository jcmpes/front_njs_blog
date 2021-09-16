import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../src/components/layout/Layout';
import NewPostForm from '../src/components/posts/NewPostForm';
import newPostAction from '../src/store/actions';

const NewPostPage = () => {

  return (
    <Layout>
      <div className="new-tweet-form">
        <NewPostForm />
      </div>
    </Layout>
  );
};

export default NewPostPage;
