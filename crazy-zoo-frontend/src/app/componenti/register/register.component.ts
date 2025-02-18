import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  nome: string = '';
  cognome: string = '';
  username: string = '';
  email: string = '';
  cellulare: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /** 🔹 Metodo per registrare un nuovo utente */
  register(): void {
    if (!this.nome || !this.cognome || !this.username || !this.email || !this.cellulare || !this.password) {
      this.errorMessage = 'Compila tutti i campi!';
      return;
    }

    this.authService.register(this.nome, this.cognome, this.username, this.email, this.cellulare, this.password);
  }

}
