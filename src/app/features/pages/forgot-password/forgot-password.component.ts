import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  isLoading = signal(false);
  emailSent = signal(false);

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    this.isLoading.set(true);

    const email = this.forgotPasswordForm.value.email!;
    const success = await this.authService.forgotPassword(email);

    this.isLoading.set(false);

    if (success) {
      this.emailSent.set(true);
      this.snackBar.open(
        'Password reset email sent. Check your inbox.',
        'Close',
        { duration: 3000 }
      );
    } else {
      this.snackBar.open(
        'Failed to send reset email. Try again.',
        'Close',
        { duration: 3000 }
      );
    }
  }

  goToSignIn() {
    this.router.navigate(['/dashboard/pages/signin']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  resendEmail() {
    this.emailSent.set(false);
    this.forgotPasswordForm.reset();
  }
}
