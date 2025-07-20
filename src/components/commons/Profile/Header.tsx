import styles from './Profile.module.scss';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { PlanCard } from '@/components/ui/Cards/PlanCard';
import { Profile } from '.';
import { useAuth } from '@/hooks/useAuth';
import { buildFullUrl } from '@/utils/buildFullUrl';
import { useModal } from '@/contexts/ModalContext';
import { EditImageModal } from '@/components/ui/Modals/EditImage/EditImageModal';
import { Dropdown } from '../Dropdown';

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
            <div className={styles.editCoverBtn}>
              <Dropdown.Root key="avatar">
                <Dropdown.Trigger>
                  <Button size="sm" variant="muted">
                    Editar imagem
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Content size="xs">
                  <Dropdown.Item>Substituir</Dropdown.Item>
                  <Dropdown.Item>Excluir</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            </div>
          )}
        </div>

        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatarWrapper}>
              <img src={buildFullUrl(customer?.avatarUrl)} alt="avatar" className={styles.avatar} />

              {onEdit && (
                <div className={styles.editAvatarBtn}>
                  <Dropdown.Root key="cover">
                    <Dropdown.Trigger>
                      <Button size="sm" variant="black">
                        Editar imagem
                      </Button>
                    </Dropdown.Trigger>

                    <Dropdown.Content size="xs">
                      <Dropdown.Item>Substituir</Dropdown.Item>
                      <Dropdown.Item>Excluir</Dropdown.Item>
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
    </>
  );
}
