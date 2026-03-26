import styles from './Main.module.scss';

export default function Main({ children }) {
  return <main className={styles.main}>{children}</main>;
}
