import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /** 🔹 Controlla se l'utente è loggato */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // ✅ L'utente è loggato, può accedere
    } else {
      console.warn('🔒 Accesso negato! Utente non autenticato.');
      this.router.navigate(['/login']); // ❌ Reindirizza al login
      return false;
    }
  }
}
