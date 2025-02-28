import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth:AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }
  isLogged: boolean = false; // Di default l'utente non è loggato
  showCart: boolean = false;
  searchTerm = '';
  nomeAnimale = '';
  numeroProdotti = 0;

  isVisible(): boolean {
    const currentRoute = this.router.url;
    // Lista delle route dove l'elemento deve essere visibile
    return [
      '/prodotti'
    ].some(route => currentRoute.startsWith(route));
  }

  numeroProdottiAggiunti(prodotti: any) {
    this.numeroProdotti = prodotti;
  }

  ngOnInit() {
    // Simuliamo il controllo dell'autenticazione
    
    this.isLogged = this.auth.isAuthenticated()

    /* this.route.queryParams.subscribe(params => {
      this.nomeAnimale = params['nomeAnimale'] || '';
      this.searchTerm = params['titolo'] || '';
    }); */
  }

  applySearch(): void {
    this.router.navigate(['/prodotti'], {
      queryParams: { titolo: this.searchTerm || null, nomeAnimale: this.nomeAnimale || null }
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.router.navigate(['/prodotti'], { queryParams: {} });
  }

  logout() {
    this.auth.logout()
  }

  toggleCart(): void {
    this.showCart = !this.showCart; // Cambia stato per mostrare/nascondere il carrello
  }
}
