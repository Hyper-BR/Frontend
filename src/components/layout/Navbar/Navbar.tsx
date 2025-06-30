import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../src/hooks/useAuth';
import UploadModal from '../../commons/Modals/UploadModal';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { user, userSigned, signOut, isArtist } = useAuth();

  return (
    <header className={styles.navbar}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Buscar" />
      </div>

      {userSigned ? (
        <>
          <div>
            {!isArtist && (
              <button
                className={styles.loginButton}
                onClick={() => navigate('/becomeArtist')}
              >
                Virar artista
              </button>
            )}
          </div>

          <div className={styles.userSection}>
            {isArtist ? (
              <>
                <button
                  className={styles.uploadButton}
                  onClick={() => setShowModal(true)}
                >
                  + Faixa
                </button>
                {showModal && (
                  <UploadModal onClose={() => setShowModal(false)} />
                )}
              </>
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => navigate('/becomeArtist')}
              >
                Virar artista
              </button>
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
