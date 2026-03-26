import styles from './Section.module.scss';

export default function Section({ children }) {
  return <section className={styles.section}>{children}</section>;
}
