import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent {
  prodotti: any;
  filters: any;

  constructor(private route: ActivatedRoute, private servP: ProdottiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters = params;
      console.log("Filtri applicati:", this.filters);
      this.loadProdotti();
    });
  }

  loadProdotti(): void {
    this.servP.getProdotto(this.filters).subscribe({
      next: data => {
        this.prodotti = data;
        console.log(this.prodotti);
        
      },
      error: err => {
        console.error("Errore nel caricamento dei prodotti", err);
      }
    });
  }
}
