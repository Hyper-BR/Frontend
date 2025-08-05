import { useEffect, useState } from 'react';
import styles from './Insights.module.scss';
import { SummaryCard } from '@/components/Insights/Summary';
import { ArtistCard } from '../Artist/ArtistCard';
import { Activity, DollarSign, Library, Music } from 'lucide-react';
import TrackTableInsights from '../Table/TrackTableInsights';
import { getInsights } from '@/services/insights';
import { InsightsDTO } from '@/services/insights/types';
import { TrackDTO } from '@/services/track/types';

export function Insights() {
  const [insights, setInsights] = useState<InsightsDTO>(null);
  const [tracks, setTracks] = useState<TrackDTO[]>(null);

  async function fetchInsights() {
    try {
      const resp = await getInsights();
      setTracks(resp.data.releases.flatMap((release) => release.tracks));
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
            <TrackTableInsights tracks={tracks} />
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
