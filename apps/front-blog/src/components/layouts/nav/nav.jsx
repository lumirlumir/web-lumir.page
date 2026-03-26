import styles from './nav.module.scss';

export default function Nav({ children }) {
  return <nav className={styles.nav}>{children}</nav>;
}
