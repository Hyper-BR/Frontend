import styles from './Card.module.scss';

type CardProps = {
  image: string;
  title: string;
  subtitle?: string[];
  onClick?: () => void;
};

const Card = ({ image, title, subtitle, onClick }: CardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      >
        {onClick && (
          <button className={styles.playButton} onClick={onClick}>
            ▶
          </button>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default Card;
