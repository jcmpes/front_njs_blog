import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../src/components/layout/Layout';
import NewPostForm from '../src/components/posts/NewPostForm';
import { getAuth } from '../src/store/selectors';

const NewPostPage = () => {
    const { isLogged } = useSelector(getAuth)
    const history = useRouter()

    useEffect(() => {
        if(!isLogged) {
            history.push('/')
        }
    })

  return (
    <Layout>
      <div className="new-tweet-form">
        <NewPostForm />
      </div>
    </Layout>
  );
};

export default NewPostPage;
