import styles from './Profile.module.scss';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { PlanCard } from '@/components/ui/Cards/PlanCard';
import { Profile } from '.';
import { useAuth } from '@/hooks/useAuth';
import { ImageCropEditor } from '../ImageCrop/ImageCropEditor';
import { PencilIcon } from 'lucide-react';
import { buildFullUrl } from '@/utils/buildFullUrl';
import { useModal } from '@/contexts/ModalContext';
import { EditImageModal } from '@/components/ui/Modals/EditImage/EditImageModal';

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
  const { closeModal, openModal } = useModal();

  return (
    <>
      <EditImageModal
        modalId="editAvatar"
        title="Editar avatar"
        aspect={1}
        onApply={(data, area) => console.log('Avatar editado:', data)}
        onClose={closeModal}
      />

      <EditImageModal
        modalId="editCover"
        title="Editar capa"
        aspect={16 / 9}
        onApply={(data, area) => console.log('Capa editada:', data)}
        onClose={closeModal}
      />

      <div className={styles.cover}>
        <div className={styles.coverImageWrapper}>
          <img src={coverUrl} alt="Capa" className={styles.coverImage} />

          {onEdit && (
            <Modal.Trigger modal="editCover">
              <Button className={styles.editCoverBtn} variant="black" size="sm" onClick={() => openModal('editAvatar')}>
                <PencilIcon size={16} />
                <span>Editar imagem</span>
              </Button>
            </Modal.Trigger>
          )}
        </div>

        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatarWrapper}>
              <img src={buildFullUrl(customer?.avatarUrl)} alt="avatar" className={styles.avatar} />

              {onEdit && (
                <Modal.Trigger modal="editAvatar">
                  <Button
                    className={styles.editAvatarBtn}
                    variant="black"
                    size="sm"
                    onClick={() => openModal('editAvatar')}
                  >
                    <PencilIcon size={14} />
                    <span>Editar imagem</span>
                  </Button>
                </Modal.Trigger>
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
    </>
  );
}
