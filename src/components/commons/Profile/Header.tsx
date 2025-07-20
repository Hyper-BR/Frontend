import styles from './Profile.module.scss';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { PlanCard } from '@/components/ui/Cards/PlanCard';
import { Profile } from '.';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { ImageCropEditor } from '../ImageCrop/ImageCropEditor';
import { PencilIcon } from 'lucide-react';
import { buildFullUrl } from '@/utils/buildFullUrl';

interface Props {
  avatarUrl: string;
  name: string;
  email?: string;
  onEdit?: boolean;
  owner?: boolean;
  stats: { followers: string; following: string };
  analytics?: { plays: string };
  coverUrl?: string;
}

export function Header({ avatarUrl, name, email, onEdit, owner, stats, analytics, coverUrl }: Props) {
  const { customer } = useAuth();

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingCover, setIsEditingCover] = useState(false);

  return (
    <div className={styles.cover}>
      <div className={styles.coverImageWrapper}>
        {isEditingCover ? (
          <ImageCropEditor
            image={coverUrl || ''}
            aspect={16 / 9}
            onCropComplete={(area) => console.log('Crop capa:', area)}
          />
        ) : (
          <img src={coverUrl} alt="Capa" className={styles.coverImage} />
        )}
        {onEdit && (
          <button className={styles.editCoverBtn} onClick={() => setIsEditingCover(true)}>
            <PencilIcon size={16} />
          </button>
        )}
      </div>

      <header className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            {isEditingAvatar ? (
              <ImageCropEditor
                image={avatarUrl}
                aspect={1}
                onCropComplete={(area) => console.log('Crop avatar:', area)}
              />
            ) : (
              <img src={buildFullUrl(customer?.avatarUrl)} alt="avatar" className={styles.avatar} />
            )}
            {onEdit && (
              <button className={styles.editAvatarBtn} onClick={() => setIsEditingAvatar(true)}>
                <PencilIcon size={14} />
              </button>
            )}
          </div>

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
            <PlanCard title={customer.subscription.name} />
          </div>
        )}
      </header>
    </div>
  );
}
