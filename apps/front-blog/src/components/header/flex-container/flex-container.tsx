import styles from './flex-container.module.scss';

export default function FlexContainer({ children }) {
  return <div className={styles['flex-container']}>{children}</div>;
}
