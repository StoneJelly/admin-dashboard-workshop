import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-face-detector',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.scss'],
})
export class FaceDetectorComponent {
  currentLevel = signal<'root' | 'face-detector'>('face-detector');

  breadcrumbs = computed(() => [
    { id: 'root', name: 'Dashboard' },
    { id: 'face-detector', name: 'Face Detector' },
  ]);

  canNavigateUp(): boolean {
    return this.currentLevel() !== 'root';
  }

  navigateUp(): void {
    this.currentLevel.set('root');
    // Optional: inject Router and navigate to dashboard
  }
}
