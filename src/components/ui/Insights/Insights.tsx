import { useEffect, useState } from 'react';
import styles from './Insights.module.scss';
import { SummaryCard } from '@/components/Insights/Summary';
import { ArtistCard } from '../Artist/ArtistCard';
import { Activity, DollarSign, Library, Music } from 'lucide-react';
import TrackTableInsights from '../Table/TrackTableInsights';
import { getInsights } from '@/services/insights';
import { InsightsDTO } from '@/services/insights/types';

export function Insights() {
  const [insights, setInsights] = useState<InsightsDTO>({
    totalPlays: 0,
    totalPurchases: 0,
    totalDownloads: 0,
    totalRevenue: 0,
    totalTracks: 0,
    totalAlbums: 0,
    tracks: [],
    topListeners: [],
  });

  async function fetchInsights() {
    try {
      const resp = await getInsights();
      setInsights(resp.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchInsights();
  }, []);

  if (!insights) return <div>Carregando...</div>;

  return (
    <div className={styles.insights}>
      <div className={styles.summaryRow}>
        <SummaryCard title="Total de Plays" value={insights.totalPlays} icon={<Activity />} />
        <SummaryCard
          title="Receita"
          value={new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(insights.totalRevenue)}
          icon={<DollarSign />}
        />
        <SummaryCard title="Total Faixas" value={insights.totalTracks} icon={<Music />} />
        <SummaryCard title="Total Álbuns" value={insights.totalAlbums} icon={<Library />} />
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.tracksSection}>
          <div className={styles.tracksPlaceholder}>
            <TrackTableInsights tracks={insights.tracks} />
          </div>
        </div>

        <aside className={styles.usersSection}>
          <h3 className={styles.sectionTitle}>Top 5 ouvintes</h3>
          {insights.topListeners.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} direction="row" />
          ))}
        </aside>
      </div>
    </div>
  );
}
