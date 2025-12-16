import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  /* ================= LINE CHART FOR EMOTION TREND ================= */
  createEmotionTrendChart(canvas: HTMLCanvasElement, data: { label: string; value: number }[]) {
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: data.map(d => d.label),
        datasets: [
          {
            label: 'Emotion Trend',
            data: data.map(d => d.value),
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63, 81, 181, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });
  }

  /* ================= DOUGHNUT CHART FOR EMOTION DISTRIBUTION ================= */
  createEmotionDistributionChart(
    canvas: HTMLCanvasElement,
    data: { emotion: string; percentage: number }[]
  ) {
    return new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.emotion),
        datasets: [
          {
            data: data.map(d => d.percentage),
            backgroundColor: ['#3f51b5', '#e91e63', '#ff9800', '#4caf50', '#ffc107'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
}
