import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, 
              private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      console.warn('Accesso negato, devi essere un ADMIN');
      alert('Non hai i permessi per accedere a questa pagina.');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
