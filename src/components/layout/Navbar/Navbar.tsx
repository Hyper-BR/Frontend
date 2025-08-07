import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import styles from './Navbar.module.scss';
import Search from '@/components/commons/Search/Search';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import UploadReleaseModal from '@/components/ui/Modals/UploadRelease/UploadReleaseModal';
import { Dropdown } from '@/components/commons/Dropdown';
import { Avatar } from '@/components/commons/Avatar/Avatar';
import { useEffect, useState } from 'react';
import { CartDTO } from '@/services/cart/types';
import { getCustomerCarts } from '@/services/cart';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [carts, setCarts] = useState<CartDTO[]>([]);

  const navigate = useNavigate();

  const { userSigned, signOut, isArtist, customer } = useAuth();

  const fetchCarts = async () => {
    const response = await getCustomerCarts();
    setCarts(response.data);
  };

  useEffect(() => {
    fetchCarts();
  }, [customer]);

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

              {!isArtist && customer.subscription.type == 'FREE' && (
                <Button className={styles.loginButton} onClick={() => navigate('/plans')} variant="ghost">
                  Ver planos
                </Button>
              )}

              {customer?.artistProfile == null && (
                <Button className={styles.loginButton} onClick={() => navigate('/becomeArtist')} variant="ghost">
                  Sou artista
                </Button>
              )}

              <Dropdown.Root>
                <Dropdown.Trigger>
                  <Button variant="ghost">
                    <ShoppingCart />
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Content size="sm">
                  {carts.map((cart) => (
                    <Dropdown.Item key={cart.id} onClick={() => navigate(`/cart/${cart.id}`)}>
                      {cart.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown.Root>

              <div className={styles.avatarDropdown}>
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <Button variant="muted">
                      <Avatar src={customer?.avatarUrl} alt="avatar" />
                    </Button>
                  </Dropdown.Trigger>

                  <Dropdown.Content size="sm">
                    <Dropdown.Item onClick={() => navigate('/profile')}>Perfil</Dropdown.Item>
                    <Dropdown.Item onClick={signOut}>Sair</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.Root>
              </div>
            </>
          ) : (
            <Button variant="ghost" className={styles.loginButton} onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
