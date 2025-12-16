import { Component, inject, viewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DashboardService } from '../../core/services/dashboard.service';
import { ChartService } from '../../core/services/chart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './dashboard-sections.scss'],
})
export class DashboardComponent implements AfterViewInit {
  revenueChart = viewChild.required<ElementRef<HTMLCanvasElement>>('revenueChart');
  userChart = viewChild.required<ElementRef<HTMLCanvasElement>>('userChart');

  private dashboardService = inject(DashboardService);
  private chartService = inject(ChartService);
  private router = inject(Router);

  /* ================= DATA ================= */
  stats = this.dashboardService.getStats;
  emotionTrend = this.dashboardService.getEmotionTrend;
  emotionDistribution = this.dashboardService.getEmotionDistribution;

  /* ================= CHART INIT ================= */
  ngAfterViewInit() {
    this.chartService.createEmotionTrendChart(
      this.revenueChart().nativeElement,
      this.emotionTrend()
    );

    this.chartService.createEmotionDistributionChart(
      this.userChart().nativeElement,
      this.emotionDistribution()
    );
  }
  
  /* ================= EXPORT ================= */
  exportReport() {
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF();
      const stats = this.stats();

      doc.setFontSize(18);
      doc.text('Emotion Detection Report', 20, 20);

      doc.setFontSize(12);
      doc.text(`Total Faces Detected: ${stats.totalFaces}`, 20, 40);
      doc.text(`Active Sessions: ${stats.activeSessions}`, 20, 50);
      doc.text(`Dominant Emotion: ${stats.dominantEmotion}`, 20, 60);
      doc.text(`Detection Accuracy: ${stats.detectionAccuracy}%`, 20, 70);

      doc.save('Emotion_Detection_Report.pdf');
    });
  }

  exportExcel() {
    import('xlsx').then((XLSX) => {
      const wb = XLSX.utils.book_new();
      const stats = this.stats();

      const data = [
        ['Metric', 'Value'],
        ['Total Faces Detected', stats.totalFaces],
        ['Active Sessions', stats.activeSessions],
        ['Dominant Emotion', stats.dominantEmotion],
        ['Detection Accuracy (%)', stats.detectionAccuracy],
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Emotion Stats');
      XLSX.writeFile(wb, 'Emotion_Detection_Report.xlsx');
    });
  }
}
