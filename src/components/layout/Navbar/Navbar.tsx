import UploadButton from '../../commons/Buttons/UploadButton/UploadButton';
import styles from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../src/hooks/useAuth';

const Navbar = () => {
  const { user, userSigned, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Buscar" />
      </div>

      {userSigned ? (
        <>
          <div>
            {false ? (
              <UploadButton />
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => navigate('/become-artist')}
              >
                Virar artista
              </button>
            )}
          </div>

          <div className={styles.userSection}>
            <img
              src={`https://i.pravatar.cc/40?u=${user?.email}`}
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
