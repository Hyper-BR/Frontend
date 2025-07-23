import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export function TrackInsights({ track }: any) {
  return (
    <div className="insights-card">
      <h3>title</h3>
      <p>Plays: 123</p>
      <p>Receita: R$ 123</p>
      <LineChart width={200} height={80} data={[123]}>
        <XAxis dataKey="date" hide />
        <YAxis hide />
        <Tooltip />
        <Line dataKey="plays" stroke="#1db954" dot={false} strokeWidth={2} />
      </LineChart>
    </div>
  );
}
