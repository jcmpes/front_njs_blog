import Link from 'next/link';
import Image from 'next/image'
import { useSelector } from 'react-redux';
import styles from '../../../styles/Article.module.css';
import { getAuth, getToken } from '../../store/selectors';

interface Article {
  id: number;
  user: string;
  body: string;
  title: string;
  image: string;
  date: Date;
  setModalParams: any;
}

const Article = ({
  id,
  image,
  user,
  body,
  title,
  date,
  setModalParams,
}: Article) => {
  const token = useSelector(getToken);
  const currentUser = useSelector(getAuth);

  const handleDelete = async (event) => {
    if (event.target.name === 'delete') {
      event.preventDefault();
      event.stopPropagation();
      setModalParams((prevState) => ({ ...prevState, show: true, id, token }));
    }
  };

  return (
    <Link onClick={handleDelete} href={`/article/${id}`}>
      <a className={styles.card}>
        <Image width={500} height={500} className={styles.image} src={image} />
        <div className={styles.content}>
          <div className={styles.details}>
            <h3>{title} &rarr;</h3>
            <p>{ body && body.length > 50 ? `${body.slice(0, 45)}...` : body}</p>
            <p className={styles.author} style={{ fontSize: '1rem' }}>
              {user}
            </p>
            <p className={styles.date} style={{ fontSize: '1rem' }}>
              {date}
            </p>
          </div>
          {currentUser.user && currentUser.user.email === user && (
            <button
              onClick={handleDelete}
              name="delete"
              className={styles.delete}
            ></button>
          )}
        </div>
      </a>
    </Link>
  );
};

export default Article;
