import styles from './Body.module.scss';

export default function Body({ children }) {
  return <body className={styles.body}>{children}</body>;
}
