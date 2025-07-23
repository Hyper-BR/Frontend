import { ReleaseDTO } from '@/services/release/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function AlbumInsights({ tracks }: any) {
  return (
    <div className="insights-card">
      <h3>nome</h3>
      <p>Plays Totais: 123</p>
      <BarChart width={200} height={100} data={[123213]}>
        <XAxis dataKey="title" hide />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="plays" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
