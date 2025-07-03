import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../src/hooks/useAuth';
import UploadModal from '../../commons/Modals/UploadModal';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { customer: user, userSigned, signOut, isArtist } = useAuth();

  return (
    <header className={styles.navbar}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Buscar" />
      </div>

      {userSigned ? (
        <>
          <div className={styles.userSection}>
            {isArtist ? (
              <>
                <button
                  className={styles.uploadButton}
                  onClick={() => setShowModal(true)}
                >
                  Upload
                </button>
                {showModal && (
                  <UploadModal onClose={() => setShowModal(false)} />
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

            <img
              src={`https://i.pravatar.cc/40?u=`}
              alt="avatar"
              className={styles.avatar}
            />
            <span>{user?.name}</span>
            <button onClick={signOut}>Sair</button>
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
