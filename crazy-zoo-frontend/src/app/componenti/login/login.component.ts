import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /** 🔹 Metodo per effettuare il login */
  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Inserisci username e password!';
      return;
    }

    this.authService.login(this.username, this.password);
  }
}
