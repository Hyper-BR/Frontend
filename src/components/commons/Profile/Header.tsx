import styles from './Profile.module.scss';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { PlanCard } from '@/components/ui/Cards/PlanCard';
import { Profile } from '.';
import { useAuth } from '@/hooks/useAuth';
import { buildFullUrl } from '@/utils/buildFullUrl';
import { useModal } from '@/contexts/ModalContext';
import { Dropdown } from '../Dropdown';
import { useState } from 'react';
import { EditAvatarImageModal } from '@/components/ui/Modals/EditImage/EditAvatarImageModal';
import { EditCoverImageModal } from '@/components/ui/Modals/EditImage/EditCoverImageModal';

interface Props {
  avatarUrl: string;
  coverUrl: string;
  name: string;
  email?: string;
  onEdit?: boolean;
  owner?: boolean;
  stats: { followers: string; following: string };
  analytics?: { plays: string };
}

export function Header({ avatarUrl, name, email, onEdit, owner, stats, analytics, coverUrl }: Props) {
  const { customer } = useAuth();
  const { closeModal, openModal } = useModal();

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);

  const handleSelectImage = async (type: 'cover' | 'avatar') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      const modalId = type === 'cover' ? 'editCover' : 'editAvatar';

      if (type === 'cover') setPreviewCover(url);
      if (type === 'avatar') setPreviewAvatar(url);

      openModal(modalId);
    };

    input.click();
  };

  return (
    <>
      <EditAvatarImageModal modalId="editAvatar" title="Editar avatar" image={previewAvatar} onClose={closeModal} />
      <EditCoverImageModal modalId="editCover" title="Editar capa" image={previewCover} onClose={closeModal} />

      <div className={styles.cover}>
        <div className={styles.coverImageWrapper}>
          <img src={buildFullUrl(coverUrl)} alt="cover" className={styles.coverImage} />
          <div className={styles.overlayContent}>
            {onEdit && (
              <div className={styles.editCoverBtn}>
                <Dropdown.Root key="cover">
                  <Dropdown.Trigger>
                    <Button size="sm" variant="muted">
                      Editar imagem
                    </Button>
                  </Dropdown.Trigger>

                  <Dropdown.Content size="xs">
                    <Dropdown.Item onClick={() => handleSelectImage('cover')}>Substituir</Dropdown.Item>
                    <Dropdown.Item onClick={() => alert('excluir')}>Excluir</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.Root>
              </div>
            )}

            <header className={styles.header}>
              <div className={styles.userInfo}>
                <div className={styles.avatarWrapper}>
                  <img src={buildFullUrl(avatarUrl)} alt="avatar" className={styles.avatar} />

                  {onEdit && (
                    <div className={styles.editAvatarBtn}>
                      <Dropdown.Root key="avatar">
                        <Dropdown.Trigger>
                          <Button size="sm" variant="black">
                            Editar imagem
                          </Button>
                        </Dropdown.Trigger>

                        <Dropdown.Content size="xs">
                          <Dropdown.Item onClick={() => handleSelectImage('avatar')}>Substituir</Dropdown.Item>
                          <Dropdown.Item onClick={() => alert('excluir')}>Excluir</Dropdown.Item>
                        </Dropdown.Content>
                      </Dropdown.Root>
                    </div>
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
        </div>
      </div>
    </>
  );
}
