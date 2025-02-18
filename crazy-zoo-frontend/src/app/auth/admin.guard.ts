import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // ✅ Accesso consentito
    } else {
      console.warn('❌ Accesso negato. Devi essere un ADMIN.');
      alert('Non hai i permessi per accedere a questa pagina.');
      this.router.navigate(['/home']); // 🔄 Reindirizza alla home
      return false;
    }
  }
}
