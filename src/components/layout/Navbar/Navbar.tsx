import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import styles from './Navbar.module.scss';
import { Modal } from '../../commons/Modal/Modal';
import UploadReleaseForm from '../../commons/Forms/UploadReleaseForm/UploadReleaseForm';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { customer: user, userSigned, signOut, isArtist } = useAuth();

  return (
    <header className={styles.navbar}>
      {userSigned ? (
        <>
          <div className={styles.userSection}>
            {isArtist ? (
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
            ) : (
              <div>
                <button
                  className={styles.loginButton}
                  onClick={() => navigate('/becomeArtist')}
                >
                  Virar artista
                </button>
              </div>
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
    </header>
  );
};

export default Navbar;
