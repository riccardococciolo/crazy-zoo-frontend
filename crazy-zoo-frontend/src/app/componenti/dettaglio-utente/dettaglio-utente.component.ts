import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dettaglio-utente',
  standalone: false,
  templateUrl: './dettaglio-utente.component.html',
  styleUrl: './dettaglio-utente.component.css'
})
export class DettaglioUtenteComponent {

  user: any = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.isAdmin = this.authService.isAdmin();
  }

  sections = [
    { name: 'Prodotti', icon: "🛍️" },
    { name: 'Marche', icon: '🏷️' },
    { name: 'Animali', icon: '🐾' },
    { name: 'Tipologie', icon: '🗂️' }
  ];
}
