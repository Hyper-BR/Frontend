import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import styles from './Navbar.module.scss';
import { Modal } from '../../commons/Modal/Modal';
import UploadReleaseForm from '../../commons/Forms/UploadReleaseForm';
import Search from '@/components/commons/Search/Search';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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
            {isArtist && (
              <>
                <button onClick={() => setShowModal(true)}>Upload</button>
                {showModal && (
                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <UploadReleaseForm
                      onClose={() => setShowModal(false)}
                      onUploadSuccess={() => setShowModal(false)}
                    />
                  </Modal>
                )}
              </>
            )}

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
                <button
                  className={styles.loginButton}
                  onClick={() => navigate('/becomeArtist')}
                >
                  Sou artista
                </button>
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
          <button
            className={styles.loginButton}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
