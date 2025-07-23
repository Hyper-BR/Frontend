import { AlbumInsights } from '@/components/Insights/AlbumInsights';
import { SummaryCard } from '@/components/Insights/Summary';
import { TrackInsights } from '@/components/Insights/TrackInsights';
import { useInsightsData } from '@/components/Insights/useInsightsData';

const InsightsPage = () => {
  const { summary, tracks, albums } = useInsightsData();

  return (
    <main className="insights-page">
      <div className="summary-grid">
        <SummaryCard title="Total de Plays" value={summary.totalPlays} />
        <SummaryCard title="Receita" value={`R$ ${summary.revenue}`} />
        <SummaryCard title="Usuários Ativos" value={summary.activeUsers} />
      </div>

      <section className="details-section">
        <h2>Insights por Faixa</h2>
        <div className="cards-grid">
          {tracks.map((t) => (
            <TrackInsights key={t.id} track={t} />
          ))}
        </div>
      </section>

      <section className="details-section">
        <h2>Insights por Álbum</h2>
        <div className="cards-grid">
          {albums.map((a) => (
            <AlbumInsights key={a.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default InsightsPage;
