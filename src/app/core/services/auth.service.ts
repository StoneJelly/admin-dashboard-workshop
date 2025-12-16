import { Injectable, signal, computed, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
import { Router } from '@angular/router';

/* ----------------- TYPES ----------------- */
export type UserRole = 'admin' | 'editor' | 'viewer';
export type Permission = string; // Firebase version uses string

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
}

/* ----------------- SERVICE ----------------- */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  public authenticated = signal(false); // PUBLIC for directives & guards
  private currentUser = signal<AuthUser | null>(null);

  user = this.currentUser.asReadonly();
  public userRole = computed(() => this.currentUser()?.role ?? null);

  /* ========== LOGIN ========== */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      this.setUser(cred.user);
      this.router.navigate(['/dashboard']);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /* ========== REGISTER ========== */
  async register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      this.setUser(cred.user, name);
      this.router.navigate(['/dashboard']);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async signinWithGoogle(): Promise<boolean> {
  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    this.setUser(cred.user);
    this.router.navigate(['/dashboard']);
    return true;
  } catch (error) {
    console.error('Google sign-in failed:', error);
    return false;
  }
}

  /* ========== LOGOUT ========== */
  async logout() {
    await signOut(this.auth);
    this.currentUser.set(null);
    this.authenticated.set(false);
    this.router.navigate(['/login']);
  }

  /* ========== HELPERS ========== */
  private setUser(user: User, name?: string) {
    const appUser: AuthUser = {
      uid: user.uid,
      email: user.email!,
      name: name ?? user.displayName ?? 'User',
      role: 'admin', // default
      permissions: this.viewerPermissions(),
    };
    this.currentUser.set(appUser);
    this.authenticated.set(true);
  }

  private viewerPermissions(): Permission[] {
    return [
      'read',
      'dashboard',
      'profile',
      'view-analytics',
      'view-reports',
      'file-download',
      'crm-view',
      'customer-view',
      'notifications-view',
    ];
  }

  /* ========== RESTORE DIRECTIVE/GUARD METHODS ========== */
  hasPermission(permission: Permission): boolean {
    return this.currentUser()?.permissions.includes(permission) ?? false;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return roles.includes(this.currentUser()?.role ?? 'viewer');
  }
}
