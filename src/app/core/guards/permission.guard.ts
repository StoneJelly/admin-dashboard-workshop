import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Permission } from '../services/auth.service';

export const permissionGuard: CanActivateFn = () => true;
