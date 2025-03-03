import { Component, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  alertMessage: any;
  showAlert: boolean = false;
  success: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Inserisci username e password!';
      return;
    }

    this.authService.login(this.username, this.password);
    setTimeout(() => {
      if (this.authService.isRcLog === false) {
        this.showAlert = true;
        this.success = false;
        this.alertMessage = this.authService.errorMessage;

        console.log('isRC errato ' + this.alertMessage);
        setTimeout(() => (this.showAlert = false), 5000);
      } else {
        this.showAlert = true;
        this.success = true;
        this.alertMessage = 'Login effettuato con successo';
        console.log('Login effettuato con successo');
        setTimeout(() => {
          this.showAlert = false;
          this.router
            .navigate(['/home'])
            .then(() => {
              console.log('Navigazione avvenuta con successo');
              window.location.reload();
            })
            .catch((error) => {
              console.error('Errore nella navigazione:', error);
            });
        }, 3000);
      }
    }, 5000);
  }
}
