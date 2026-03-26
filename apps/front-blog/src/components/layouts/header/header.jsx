import styles from './header.module.scss';

export default function Header({ children }) {
  return <header className={styles.header}>{children}</header>;
}
