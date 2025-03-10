import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'May 1', lorem: 40, loremB: 30 },
  { name: 'May 5', lorem: 55, loremB: 35 },
  { name: 'May 10', lorem: 60, loremB: 40 },
  { name: 'May 15', lorem: 65, loremB: 42 },
  { name: 'May 20', lorem: 58, loremB: 38 },
  { name: 'May 25', lorem: 70, loremB: 45 },
  { name: 'May 30', lorem: 75, loremB: 50 }
];

export default function GraficoLine() {
  return (
    <div className="p-4 rounded-xl">
      <h2 className="text-white text-lg font-bold">Lorem</h2>
      <p className="text-gray-400 text-sm">May 30 - Apr 30</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="lorem" stroke="#001DFF" strokeWidth={2} />
          <Line type="monotone" dataKey="loremB" stroke="#FF7664" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}