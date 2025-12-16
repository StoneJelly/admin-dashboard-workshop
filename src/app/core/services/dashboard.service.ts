import { Injectable, signal } from '@angular/core';

export interface EmotionDashboardStats {
  totalFaces: number;
  activeSessions: number;
  dominantEmotion: string;
  detectionAccuracy: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  /* ================= KPI STATS ================= */
  private stats = signal<EmotionDashboardStats>({
    totalFaces: 1240,
    activeSessions: 6,
    dominantEmotion: 'Happy',
    detectionAccuracy: 92,
  });

  /* ================= CHART DATA ================= */
  private emotionTrend = signal([
    { label: 'Happy', value: 40 },
    { label: 'Neutral', value: 25 },
    { label: 'Sad', value: 15 },
    { label: 'Angry', value: 10 },
    { label: 'Surprised', value: 10 },
  ]);

  private emotionDistribution = signal([
    { emotion: 'Happy', percentage: 40 },
    { emotion: 'Neutral', percentage: 25 },
    { emotion: 'Sad', percentage: 15 },
    { emotion: 'Angry', percentage: 10 },
    { emotion: 'Surprised', percentage: 10 },
  ]);

  /* ================= PUBLIC READONLY ================= */
  getStats = this.stats.asReadonly();
  getEmotionTrend = this.emotionTrend.asReadonly();
  getEmotionDistribution = this.emotionDistribution.asReadonly();
}
