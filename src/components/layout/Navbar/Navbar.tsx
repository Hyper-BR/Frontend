import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import styles from './Navbar.module.scss';
import Search from '@/components/commons/Search/Search';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import UploadReleaseModal from '@/components/ui/Forms/UploadReleaseModal';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userSigned, signOut, isArtist, customer } = useAuth();

  return (
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
            <Modal.Trigger modal="upload">
              <Button variant="ghost">Upload</Button>
            </Modal.Trigger>

            <UploadReleaseModal />

            {!isArtist && (
              <button
                className={styles.loginButton}
                onClick={() => navigate('/plans')}
              >
                Ver planos
              </button>
            )}

            {customer?.artistProfile == null && (
              <>
                <Button
                  className={styles.loginButton}
                  onClick={() => navigate('/becomeArtist')}
                >
                  Sou artista
                </Button>
              </>
            )}

            <div className={styles.avatarDropdown}>
              <img
                src={`https://i.pravatar.cc/40?u=`}
                alt="avatar"
                className={styles.avatar}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <span
                    className={styles.dropdownItem}
                    onClick={() => navigate('/profile')}
                  >
                    Perfil
                  </span>
                  <span className={styles.dropdownItem} onClick={signOut}>
                    Sair
                  </span>
                </div>
              )}
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
  );
};

export default Navbar;
