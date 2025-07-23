import React, { useCallback } from 'react';
import styles from './Insights.module.scss';
import { SummaryCard } from '@/components/Insights/Summary';
import { ArtistCard } from '../Artist/ArtistCard';
import { ArtistDTO } from '@/services/artist/types';

interface Props {
  summary: {
    totalPlays: number;
    totalRevenue: number;
    totalTracks: number;
    totalAlbums: number;
  };
  topListeners: ArtistDTO[];
}

export function Insights({ summary, topListeners }: Props) {
  const handleSummaryClick = useCallback((key: keyof Props['summary']) => {
    alert(`Clicked summary: ${key}`);
  }, []);

  const handleUserClick = useCallback((userId: string) => {
    alert(`Clicked user: ${userId}`);
  }, []);

  return (
    <div className={styles.insights}>
      {/* Row superior com 4 summary cards */}
      <div className={styles.summaryRow}>
        <SummaryCard
          title="Total de Plays"
          value={summary.totalPlays}
          onClick={() => handleSummaryClick('totalPlays')}
        />
        <SummaryCard
          title="Total Receita"
          value={`R$ ${summary.totalRevenue}`}
          onClick={() => handleSummaryClick('totalRevenue')}
        />
        <SummaryCard
          title="Total Faixas"
          value={summary.totalTracks}
          onClick={() => handleSummaryClick('totalTracks')}
        />
        <SummaryCard
          title="Total Álbuns"
          value={summary.totalAlbums}
          onClick={() => handleSummaryClick('totalAlbums')}
        />
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.tracksSection}>
          <h3 className={styles.sectionTitle}>Tracks</h3>
          <div className={styles.tracksPlaceholder}>
            <p>Tabela de faixas vai aqui</p>
          </div>
        </div>

        <aside className={styles.usersSection}>
          <h3 className={styles.sectionTitle}>Top 5 ouvintes</h3>
          {topListeners.map((user) => (
            <ArtistCard artist={user} direction="row" />
          ))}
        </aside>
      </div>
    </div>
  );
}
