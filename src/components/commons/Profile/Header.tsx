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
  const { closeModal } = useModal();

  return (
    <>
      <Modal.Root modal="editCover" size="lg" onClose={closeModal}>
        <Modal.Header title="Editar capa" />
        <Modal.Content>
          <ImageCropEditor
            image={coverUrl || ''}
            aspect={16 / 9}
            onCropComplete={(area) => console.log('Capa:', area)}
          />
        </Modal.Content>
        <Modal.Footer
          cancelButton={
            <Button variant="ghost" onClick={closeModal}>
              Cancelar
            </Button>
          }
          submitButton={<Button>Aplicar</Button>}
        />
      </Modal.Root>

      {/* ✅ Modal para editar avatar */}
      <Modal.Root modal="editAvatar" size="sm" onClose={closeModal}>
        <Modal.Header title="Editar avatar" />
        <Modal.Content>
          <ImageCropEditor
            image={buildFullUrl(customer?.avatarUrl)}
            aspect={1}
            onCropComplete={(area) => console.log('Avatar:', area)}
          />
        </Modal.Content>
        <Modal.Footer
          cancelButton={
            <Button variant="ghost" onClick={closeModal}>
              Cancelar
            </Button>
          }
          submitButton={<Button>Aplicar</Button>}
        />
      </Modal.Root>
      <div className={styles.cover}>
        <div className={styles.coverImageWrapper}>
          <img src={coverUrl} alt="Capa" className={styles.coverImage} />

          {onEdit && (
            <Modal.Trigger modal="editCover">
              <button className={styles.editCoverBtn}>
                <PencilIcon size={16} />
                <span>Editar imagem</span>
              </button>
            </Modal.Trigger>
          )}
        </div>

        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatarWrapper}>
              <img src={buildFullUrl(customer?.avatarUrl)} alt="avatar" className={styles.avatar} />

              {onEdit && (
                <Modal.Trigger modal="editAvatar">
                  <button className={styles.editAvatarBtn}>
                    <PencilIcon size={14} />
                    <span>Editar imagem</span>
                  </button>
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
