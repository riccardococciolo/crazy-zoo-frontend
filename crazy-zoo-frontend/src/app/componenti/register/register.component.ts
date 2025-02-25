import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private _formBuilder: FormBuilder = inject(FormBuilder);

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{2,50}$/)]],
      cognome: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{2,50}$/)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]{3,20}$/)]],
      email: ['', [Validators.required, Validators.email]],
      cellulare: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      via: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9\s]{3,100}$/)]],
      civico: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
      cap: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      citta: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{2,50}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  /** 🔹 Metodo per registrare un nuovo utente */
  register(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.authService.register(
        userData.nome, userData.cognome, userData.username, userData.email, userData.cellulare,
        userData.via, userData.civico, userData.cap, userData.citta, userData.password)
    }
  }

/** 🔹 Metodo per controllare se un campo è invalido */
isFieldInvalid(field: string): boolean {
  const control = this.registerForm.get(field);
  return !!(control && control.invalid && (control.dirty || control.touched));
}

/** 🔹 Metodo per controllare se un intero step è valido */
isStepValid(fields: string[]): boolean {
  return fields.every(field => this.registerForm.get(field)?.valid);
}

}
