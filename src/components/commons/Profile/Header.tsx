import styles from './Profile.module.scss';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { PlanCard } from '@/components/ui/Cards/PlanCard';
import { Profile } from '.';

interface Props {
  avatarUrl: string;
  name: string;
  email?: string;
  onEdit?: boolean;
  owner?: boolean;
  stats: { followers: string; following: string };
  analytics?: { plays: string };
}

export function Header({
  avatarUrl,
  name,
  email,
  onEdit,
  owner,
  stats,
  analytics,
}: Props) {
  return (
    <div className={styles.cover}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <img src={avatarUrl} alt={name} className={styles.avatar} />
          <div className={styles.details}>
            <h2>{name}</h2>
            {email && <p className={styles.email}>{email}</p>}
            {onEdit && (
              <div className={styles.editProfile}>
                <Modal.Trigger modal="editProfile">
                  <Button className={styles.editBtn} variant="ghost">
                    Editar perfil
                  </Button>
                </Modal.Trigger>
              </div>
            )}
            <div className={styles.stats}>
              <Profile.Stats stats={stats} analytics={analytics} />
            </div>
          </div>
        </div>

        {owner && (
          <div className={styles.planSection}>
            <PlanCard title="Plano Premium" />
          </div>
        )}
      </header>
    </div>
  );
}
