import { useNavigate } from 'react-router-dom';
import styles from './PlanCard.module.scss';

interface Props {
  title: string;
}

export function PlanCard({ title }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate('/plans')}>
      <strong className={styles.title}>{title}</strong>
    </div>
  );
}
