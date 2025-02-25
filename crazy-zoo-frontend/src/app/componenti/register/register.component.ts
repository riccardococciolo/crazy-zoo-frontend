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
  via: string = '';
  civico: string = '';
  cap: string = '';
  citta: string = '';
  password: string = '';

  errorMessage: string = '';
  errors: any = {};


  constructor(private authService: AuthService, private router: Router) {}

  validateFields(): boolean {
    this.errors = {}; // Reset degli errori

    if (!/^[A-Za-zÀ-ÿ\s]{2,50}$/.test(this.nome)) {
      this.errors.nome = 'Nome non valido';
    }
    if (!/^[A-Za-zÀ-ÿ\s]{2,50}$/.test(this.cognome)) {
      this.errors.cognome = 'Cognome non valido';
    }
    if (!/^[a-zA-Z0-9._-]{3,20}$/.test(this.username)) {
      this.errors.username = 'Username non valido (3-20 caratteri)';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors.email = 'Email non valida';
    }
    if (!/^\d{10}$/.test(this.cellulare)) {
      this.errors.cellulare = 'Numero di cellulare non valido (10 cifre)';
    }
    if (!/^[A-Za-zÀ-ÿ0-9\s]{3,100}$/.test(this.via)) {
      this.errors.via = 'Via non valida';
    }
    if (!/^\d{1,5}$/.test(this.civico)) {
      this.errors.civico = 'Civico non valido';
    }
    if (!/^\d{5}$/.test(this.cap)) {
      this.errors.cap = 'CAP non valido (5 cifre)';
    }
    if (!/^[A-Za-zÀ-ÿ\s]{2,50}$/.test(this.citta)) {
      this.errors.citta = 'Città non valida';
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(this.password)) {
      this.errors.password = 'Password non valida (min 8 caratteri, almeno una lettera e un numero)';
    }

    return Object.keys(this.errors).length === 0;
  }

  /** 🔹 Metodo per registrare un nuovo utente */
  register(): void {
    if (this.validateFields()) {
      this.authService.register(this.nome, this.cognome, this.username, this.email, this.cellulare, this.via, this.civico, this.cap, this.citta, this.password)
    }
  }

}
