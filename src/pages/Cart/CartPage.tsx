import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { getCartTracks } from '@/services/cart';
import { useParams } from 'react-router-dom';
import TrackTable from '@/components/ui/Table/TrackTable';
import { CartDTO } from '@/services/cart/types';

const CartPage = () => {
  const { id } = useParams();

  const [cart, setCart] = useState<CartDTO>({ id: '', name: '', tracks: [] });

  const removeItem = (trackId: string) => {};

  const handleCheckout = async () => {
    // Chamada para backend que cria sessão Stripe
    alert('aa');
  };

  const fetchTracks = async () => {
    const response = await getCartTracks(id);
    setCart(response.data);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <div>
      <h1>{cart.name}</h1>
      <TrackTable tracks={cart?.tracks} />
      <div className={styles.summary}>
        <span>Total: R$ 123</span>
        <button onClick={handleCheckout}>Finalizar compra</button>
      </div>
    </div>
  );
};

export default CartPage;
