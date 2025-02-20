import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth:AuthService){

  }
  isLogged: boolean = false; // Di default l'utente non è loggato
  showCart: boolean = false;

  ngOnInit() {
    // Simuliamo il controllo dell'autenticazione
    
    this.isLogged = this.auth.isAuthenticated()
  }

  logout() {
    this.auth.logout()
  }

  toggleCart(): void {
    this.showCart = !this.showCart; // Cambia stato per mostrare/nascondere il carrello
  }
}
