import styles from './Nav.module.scss';

export default function Nav({ children }) {
  return <nav className={styles.nav}>{children}</nav>;
}
