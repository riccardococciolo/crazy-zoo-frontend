import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimaliService } from '../../services/animali.service';
import { MarcheService } from '../../services/marche.service';
import { TipologieService } from '../../services/tipologie.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  animali: any;
  marche: any;
  tipologie: any;
  constructor(
    private animaleService: AnimaliService,
    private marcaService: MarcheService,
    private tipologiaService: TipologieService // Inietta il servizio degli animali
  ) {}

  ngOnInit(): void {
    // Recupera gli animali e i prodotti quando il componente viene inizializzato
    this.animaleService.getAnimale().subscribe(data => {
      this.animali = data; // Popola l'array degli animali
    });
    this.marcaService.getMarche().subscribe(data => {
      this.marche = data; 
    });
    this.tipologiaService.getTipologia().subscribe(data => {
      this.tipologie = data; 
    });
  }
}
