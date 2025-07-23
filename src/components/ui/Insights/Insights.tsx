import React, { useCallback } from 'react';
import styles from './Insights.module.scss';
import { SummaryCard } from '@/components/Insights/Summary';
import { ArtistCard } from '../Artist/ArtistCard';
import { ArtistDTO } from '@/services/artist/types';
import { Activity, DollarSign, Library, Music } from 'lucide-react';
import TrackTableInsights from '../Table/TrackTableInsights';

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
  return (
    <div className={styles.insights}>
      <div className={styles.summaryRow}>
        <SummaryCard title="Total de Plays" value={summary.totalPlays} icon={<Activity />} />
        <SummaryCard title="Receita" value={`R$ ${summary.totalRevenue}`} icon={<DollarSign />} />
        <SummaryCard title="Total Faixas" value={summary.totalTracks} icon={<Music />} />
        <SummaryCard title="Total Álbuns" value={summary.totalAlbums} icon={<Library />} />
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.tracksSection}>
          <div className={styles.tracksPlaceholder}>
            <TrackTableInsights tracks={[]} />
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
