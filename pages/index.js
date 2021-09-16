import { InferGetStaticPropsType } from 'next';
import Navbar from '../src/components/layout/Navbar';
import Article from '../src/components/posts/Article';

import Layout from '../src/components/layout/Layout';
import PostList from '../src/components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsData, getToken } from '../src/store/selectors';
import { useEffect } from 'react';
import { postsLoadAction } from '../src/store/actions';

export default function Home() {

    const dispatch = useDispatch()
    const posts = useSelector(getPostsData)
    const token = useSelector(getToken)

    useEffect(() => {
        dispatch(postsLoadAction(token));
    }, [])

  return (
    <Layout>
        { console.log(posts) }
        { posts
            ? <PostList posts={posts} />
            : "No postss"
        }
    </Layout>
  );
}

// export const getStaticProps = async () => {
//   const posts = await getPosts();
//   return {
//     props: {
//       posts,
//     },
//   };
// };

// interface Articles {
//     body: string;
//     id: number;
//     title: string;
//     userId: number;
//   }

//   export default function Home({
//     articles,
//   }: InferGetStaticPropsType<typeof getStaticProps>) {
//     return (
//       <div className="max-w-5xl mx-auto">
//         <Navbar />
//         <div className="grid grid-cols-1 md:grid-cols-2 space-x-5 space-y-5">
//           {articles.map((article) => (
//             <Article
//               body={article.body}
//               id={article.id}
//               title={article.title}
//               userId={article.userId}
//               key={article.id}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   export const getStaticProps = async () => {
//     const articles: Articles[] = await getPosts();

//     return {
//       props: {
//         articles,
//       },
//     };
//   };
