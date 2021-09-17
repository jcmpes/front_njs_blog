/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Article.module.css';
import { getAuth, getToken } from '../../store/selectors';

const Article = ({
  id,
  image,
  user,
  body,
  title,
  date,
  setModalParams,
}) => {
  const currentUser = useSelector(getAuth);

  const handleDelete = async (event) => {
    if (event.target.name === 'delete') {
      event.preventDefault();
      event.stopPropagation();
      setModalParams((prevState) => ({ ...prevState, show: true, id }));
    }
  };

  return (
    <Link onClick={handleDelete} href=''>
      <a className={styles.card}>
        <img className={styles.image} src={image} />
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
