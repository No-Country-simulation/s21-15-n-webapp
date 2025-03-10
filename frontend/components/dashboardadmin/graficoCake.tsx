import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface GraficoPieProps {
  data: number[]; // Valores para el gráfico
  labels: string[]; // Etiquetas para las categorías
  colors?: string[]; // Colores personalizados (opcional)
}

export const GraficoCake: React.FC<GraficoPieProps> = ({ data, labels, colors }) => {
  const defaultColors = ['#A155B9', '#7987FF', '#F765A3', '#4BC0C0'];

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors || defaultColors.slice(0, labels.length),
        borderColor: colors || defaultColors.slice(0, labels.length),
        borderWidth: 2,
        hoverBackgroundColor: colors
          ? colors.map((color) => `${color}CC`)
          : defaultColors.slice(0, labels.length).map((color) => `${color}CC`),
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'doughnut'>) => 
            `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1, // Ajusta el grosor del borde de las secciones
      }
    },
    cutout: 65, // Ajusta el grosor de la dona (reduce el valor para hacerla más fina)
  };

  return (
    <div className="relative w-full h-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
