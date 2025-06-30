import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Buscar" />
      </div>
      <div className={styles.userSection}>
        <img
          src="https://i.pravatar.cc/32"
          alt="avatar"
          className={styles.avatar}
        />
        <span>Gustavo</span>
      </div>
    </header>
  );
};

export default Navbar;
