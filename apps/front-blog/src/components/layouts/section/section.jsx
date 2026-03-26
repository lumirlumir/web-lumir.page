import styles from './section.module.scss';

export default function Section({ children }) {
  return <section className={styles.section}>{children}</section>;
}
