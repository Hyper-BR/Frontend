import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmPayment } from '@/services/payment';
import styles from './Success.module.scss';

export default function SuccessPage() {
  const [status, setStatus] = useState('Confirmando pagamento...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    async function handleConfirmPayment() {
      try {
        const response = await confirmPayment(sessionId);
        console.log(response);
        setStatus('🎉 Assinatura ativada com sucesso!');
        setTimeout(() => navigate('/'), 3000);
      } catch {
        setStatus('❌ Erro ao validar pagamento.');
      }
    }

    if (sessionId) handleConfirmPayment();
    else setStatus('Sessão não encontrada.');
  }, [sessionId]);

  return (
    <main className={styles.success}>
      <h1>{status}</h1>
      <p>Aguarde, redirecionando para sua conta...</p>
    </main>
  );
}
