import styles from './Accordion.module.scss';

export const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.accordion}>{children}</div>;
};
