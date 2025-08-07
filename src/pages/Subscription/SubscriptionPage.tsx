import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSubscripions } from '@/services/subscriptions';
import { SubscriptionDTO } from '@/services/subscriptions/types';
import { subscriptionDetailsByType } from '@/constants/subscriptionDetails';
import styles from './SubscriptionPage.module.scss';
import { upgradeSubscription } from '@/services/payment';
import { Button } from '@/components/commons/Button/Button';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handleUpgrade = async (subscription: SubscriptionDTO) => {
    try {
      const { data } = await upgradeSubscription(subscription);
      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        navigate('/payment/cancel');
      }
    } catch (err) {
      console.error('Erro ao fazer upgrade', err);
    }
  };

  useEffect(() => {
    getSubscripions()
      .then(({ data }) => setPlans(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const paidPlans = plans.filter((p) => !p.type.startsWith('FREE'));

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <h1>Seja Premium. Transforme sua experiência.</h1>
        <p>Escolha o plano ideal para ouvir, criar ou gerenciar artistas com estilo e controle.</p>
      </header>

      <div className={styles.grid}>
        {paidPlans.map((plan) => {
          const detail = subscriptionDetailsByType[plan.type];
          if (!detail) return null;

          return (
            <div key={plan.id} className={styles.card}>
              {plan.type === 'FAMILY' && <span className={styles.badge}>Mais popular</span>}
              <div className={styles.header}>
                <span className={styles.icon}>{detail.icon}</span>
                <h2>{plan.name}</h2>
                <p className={styles.price}>R$ {plan.price}/mês</p>
                <p className={styles.audience}>{detail.audience}</p>
              </div>
              <ul className={styles.features}>
                {detail.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <Button onClick={() => handleUpgrade(plan)}>Assinar</Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
