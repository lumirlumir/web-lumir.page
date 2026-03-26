import styles from './body.module.scss';

export default function Body({ children }) {
  return <body className={styles.body}>{children}</body>;
}
