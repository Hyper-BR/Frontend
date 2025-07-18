import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import styles from './Navbar.module.scss';
import Search from '@/components/commons/Search/Search';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import UploadReleaseModal from '@/components/ui/Modals/UploadRelease/UploadReleaseModal';
import { Dropdown } from '@/components/commons/Dropdown';
import { buildFullUrl } from '@/utils/buildFullUrl';

const Navbar = () => {
  const navigate = useNavigate();

  const { userSigned, signOut, isArtist, customer } = useAuth();

  return (
    <>
      <UploadReleaseModal />
      <header className={styles.navbar}>
        <div className={styles.leftSection}>
          <button className={styles.logoButton} onClick={() => navigate('/')}>
            <span className={styles.logoDot} />
            <span className={styles.logoText}>LOGO</span>
          </button>
        </div>

        <div className={styles.centerSection}>
          <Search />
        </div>

        <div className={styles.userSection}>
          {userSigned ? (
            <>
              {isArtist && (
                <Modal.Trigger modal="upload">
                  <Button variant="ghost">Upload</Button>
                </Modal.Trigger>
              )}

              {!isArtist && (
                <Button
                  className={styles.loginButton}
                  onClick={() => navigate('/plans')}
                  variant="ghost"
                >
                  Ver planos
                </Button>
              )}

              {customer?.artistProfile == null && (
                <>
                  <Button
                    className={styles.loginButton}
                    onClick={() => navigate('/becomeArtist')}
                    variant="ghost"
                  >
                    Sou artista
                  </Button>
                </>
              )}

              <div className={styles.avatarDropdown}>
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <img
                      src={buildFullUrl(customer?.avatarUrl)}
                      alt="avatar"
                      className={styles.avatar}
                    />
                  </Dropdown.Trigger>

                  <Dropdown.Content size="sm">
                    <Dropdown.Item
                      label="Perfil"
                      onSelect={() => navigate('/profile')}
                    />
                    <Dropdown.Item label="Sair" onSelect={signOut} />
                  </Dropdown.Content>
                </Dropdown.Root>
              </div>
            </>
          ) : (
            <Button
              variant="ghost"
              className={styles.loginButton}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
