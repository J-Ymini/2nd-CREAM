import React from 'react';
import { Line } from 'react-chartjs-2';

export default function DealChart({ chartData }) {
  const data = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, '#f59180');
    gradient.addColorStop(1, '#fff9f8');

    return {
      labels:
        chartData[0] !== undefined &&
        chartData.map(orderDate => orderDate.order_date).reverse(),

      datasets: [
        {
          backgroundColor: gradient,
          borderColor: '#ff6c23',
          borderWidth: 1,
          pointRadius: 0,
          pointHoverBorderColor: '#ff6c23',
          pointHoverBorderWidth: 2,
          tension: 0,
          spanGaps: true,
          data:
            chartData[0] !== undefined &&
            chartData.map(productPrice => productPrice.price).reverse(),
        },
      ],
    };
  };

  const options = {
    layout: {
      padding: {
        top: 50,
      },
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          position: 'right',
          ticks: {
            min: 0,
            max: 10000000,
            stepSize: 2000000,
            fontColor: '#b2b2b2',
          },
          gridLines: {
            color: 'white',
          },
        },
      ],
    },
  };

  return <Line data={data} width={570} height={150} options={options} />;
}
