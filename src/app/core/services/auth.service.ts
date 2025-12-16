import { Injectable, signal, computed, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged
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
const AUTH_KEY = 'auth_user';
/* ----------------- SERVICE ----------------- */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  public authenticated = signal(false); // PUBLIC for directives & guards
  private currentUser = signal<AuthUser | null>(null);

  user = this.currentUser.asReadonly();
  public userRole = computed(() => this.currentUser()?.role ?? null);

  constructor() {
  const storedUser = localStorage.getItem(AUTH_KEY);

  if (storedUser) {
    const user = JSON.parse(storedUser) as AuthUser;
    this.currentUser.set(user);
    this.authenticated.set(true);
  }
}
  
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
  /* ================= FORGOT PASSWORD ================= */
  async forgotPassword(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  }

  /* ========== LOGOUT ========== */
  async logout() {
  await signOut(this.auth);

  localStorage.removeItem(AUTH_KEY);

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
    role: 'admin',
    permissions: ['*'], // full access
  };

  this.currentUser.set(appUser);
  this.authenticated.set(true);

  // ✅ STORE IN LOCAL STORAGE
  localStorage.setItem(AUTH_KEY, JSON.stringify(appUser));
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  }

}
