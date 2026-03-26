import styles from './article.module.scss';

export default function Article({ children }) {
  return <article className={styles.article}>{children}</article>;
}
