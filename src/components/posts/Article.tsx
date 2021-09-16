import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Article.module.css';
import { deletePost } from '../../api/posts';
import { getAuth, getToken } from '../../store/selectors';

interface Article {
  id: number;
  user: string;
  body: string;
  title: string;
  image: string;
}

const Article = ({ id, image, user, body, title }: Article) => {
  const token = useSelector(getToken);
  const currentUser = useSelector(getAuth);

  const handleDelete = async (event) => {
      if (event.target.name === 'delete') {
          event.preventDefault();
          event.stopPropagation();
          await deletePost(id, token);
      } else {

      }
  };

  return (
    <Link onClick={handleDelete} href={`/article/${id}`}>
      <a className={styles.card}>
        <img className={styles.image} src={image} />
        <div className={styles.content}>
          <div className={styles.details}>
            <h3>{title} &rarr;</h3>
            <h6 className={styles.author}>{user}</h6>
            <p>{body.length > 50 ? `${body.slice(0, 45)}...` : body}</p>
          </div>
          {
              currentUser.user && currentUser.user.email === user
              && <button onClick={handleDelete} name="delete" className={styles.delete}></button>
          }  
        </div>
      </a>
    </Link>
  );
};

export default Article;
