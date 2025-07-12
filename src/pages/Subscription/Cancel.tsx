import styles from './Cancel.module.scss';

export default function CancelPage() {
  return (
    <main className={styles.cancel}>
      <h1>❌ Pagamento cancelado</h1>
      <p>Você pode tentar novamente ou escolher outro plano.</p>
      <a href="/subscriptions" className={styles.link}>
        Escolher outro plano
      </a>
    </main>
  );
}
