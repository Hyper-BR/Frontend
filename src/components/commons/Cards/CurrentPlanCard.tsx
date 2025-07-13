import { Button } from '../Button/Button';
import styles from './CurrentPlanCard.module.scss';
import { useAuth } from '@/hooks/useAuth';

export const CurrentPlanCard = () => {
  const { customer } = useAuth();
  const plan = customer.subscription.type;

  return (
    <div className={styles.card}>
      <p className={styles.planName}>
        {plan === 'FREE_LISTENER' ? 'Gratuito (Ouvinte)' : plan}
      </p>
      <Button onClick={() => window.location.assign('/plans')}>
        Fazer Upgrade
      </Button>
    </div>
  );
};
