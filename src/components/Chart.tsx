import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchBitcoinData } from '../features/bitcoin/bitcoinSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = () => {
  const { data: chartData, error } = useAppSelector((state) => state.bitcoin);
  const dispatch = useAppDispatch();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: chartData.chartName,
      },
    },
  };

  const data = {
    labels: chartData.time,
    datasets: Object.values(chartData.bpi),
  };

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (!chartData.time.length) {
      dispatch(fetchBitcoinData());
    } else {
      timerId = setInterval(() => {
        dispatch(fetchBitcoinData());
      }, 15000);
    }
    return () => clearInterval(timerId);
  }, [dispatch, chartData.time.length]);

  if (error.message) {
    return (
      <h1 className='text-center p-3 font-semibold text-rose-600'>
        {error.message}
      </h1>
    );
  }

  return (
    <div className='container p-6 mx-auto'>
      <Line
        options={options}
        data={data}
        className='border border-neutral-800-500 p-5'
      />
    </div>
  );
};
