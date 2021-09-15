import Link from "next/link";
import styles from "../../../styles/Article.module.css";

interface Article {
  id: number;
  userId: number;
  body: string;
  title: string;
}

const Article = ({ id, userId, body, title }: Article) => {
  return (
    <Link href={`/article/${id}`}>
      <a className={styles.card}>
        <h3>{title} &rarr;</h3>
        <p>{body.length > 50 ? `${body.slice(0, 45)}...` : body}</p>
      </a>
    </Link>
  );
};

export default Article;