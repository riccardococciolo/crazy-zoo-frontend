import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent {
  prodotti: any;
  totalElements: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;
  filters: any;
  loading: boolean = false;
  showAlert = false;
  alertMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, private servP: ProdottiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters = params;
      console.log("Filtri applicati:", this.filters);
      this.loadProdotti();
    });
  }

  onProdottoAggiunto(nomeProdotto: string) {
    this.alertMessage = `${nomeProdotto} aggiunto al carrello con successo!`;
    this.showAlert = true;
    
    setTimeout(() => this.showAlert = false, 3000);
  }

  loadProdotti(): void {
    this.loading = true;
    this.servP.getProdotto(this.filters, this.pageIndex, this.pageSize).subscribe({
      next: data => {
        this.prodotti = data;
        console.log(this.prodotti);
        this.totalElements = this.prodotti.totalElements
        this.loading = false;
      },
      error: err => {
        console.error("Errore nel caricamento dei prodotti", err);
        this.loading = false;
      }
    });
    
  }

  onPageChange(event: PageEvent): void {
    console.log("Evento paginator ricevuto:", event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("Nuovi valori: pageIndex =", this.pageIndex, "pageSize =", this.pageSize);
    this.loadProdotti();
  }
}
