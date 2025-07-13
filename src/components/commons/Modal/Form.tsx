import styles from './Modal.module.scss';

interface Props {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ children, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};
