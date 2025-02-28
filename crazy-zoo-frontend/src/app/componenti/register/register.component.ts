import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  alertMessage : any
  showAlert : boolean = false
  success : boolean = false

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
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator }); // 👈 Aggiunto validatore personalizzato
  }

  /** 🔹 Metodo per registrare un nuovo utente */
  register(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.authService.register(
        userData.nome, userData.cognome, userData.username, userData.email, userData.cellulare,
        userData.via, userData.civico, userData.cap, userData.citta, userData.password)
    }
    setTimeout(() => {if (this.authService.isRcReg === false){
      this.showAlert = true
      this.success = false
      this.alertMessage = "Credenziali errate"

      console.log("isRC errato " + this.alertMessage)
      setTimeout(() => this.showAlert = false, 7000);
    } else {
      this.showAlert = true
      this.success = true
      this.alertMessage = "Registrazione effettuata con successo"
      console.log("Registrazione effettuata con successo")
      setTimeout(() => {
        this.showAlert = false;
        this.router.navigate(['/login'])
            .then(() => {
                console.log('Navigazione avvenuta con successo');
                window.location.reload();
            })
            .catch(error => {
                console.error('Errore nella navigazione:', error);
            });
    }, 7000);
    }}, 3000);
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

  /** 🔹 Validatore per verificare che password e conferma siano uguali */
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

/** 🔹 Metodo per controllare se le password non coincidono (mostra errore solo se il secondo campo è toccato) */
isPasswordMismatch(): boolean {
  const confirmPasswordControl = this.registerForm.get('confirmPassword');
  return !!(this.registerForm.hasError('passwordsMismatch') && confirmPasswordControl?.touched);
}


}
