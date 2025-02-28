import { Component, OnInit } from '@angular/core';
import { OrdiniService } from '../../services/ordini.service';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-ordine',
  standalone: false,
  templateUrl: './ordine.component.html',
  styleUrl: './ordine.component.css'
})
export class OrdineComponent implements OnInit{
  constructor(private ordiniS : OrdiniService){}
  listOrdini : any
  ngOnInit(): void {
    this.loadAllOrdini()
    
  }
  loadAllOrdini():void{
    this.ordiniS.listAll().subscribe((resp:any) =>{
      if(resp.rc){
      this.listOrdini = resp.dati
      }

    })
  }
  exportCSV(): void {
    if (!this.listOrdini || this.listOrdini.length === 0) {
      alert('Ordini vuoti');
      return;
    }
    
    const csvData: string[] = [];
    this.listOrdini.forEach((ordine: any) => {
      csvData.push(`IdOrdine;Nome;Cognome;Email;Indirizzo;Totale`);
      csvData.push(`${ordine.id};${ordine.utente.nome};${ordine.utente.cognome};${ordine.utente.email};${ordine.utente.indirizzo ? `${ordine.utente.indirizzo.via}, ${ordine.utente.indirizzo.civico}, ${ordine.utente.indirizzo.cap} ${ordine.utente.indirizzo.citta}` : 'N/A'};${ordine.totale}`);
      csvData.push(`Prodotto`);
      csvData.push(`IdProdotto;TitoloProdotto;PrezzoProdotto;QuantitaProdotto;MarcaProdotto;TipologiaProdotto`);
      ordine.prodotti.forEach((prodotto: any) => {
        csvData.push(`${prodotto.id};${prodotto.titolo};${prodotto.prezzo};${prodotto.quantita};${prodotto.marca ? prodotto.marca.nome : 'N/A'};${prodotto.tipologia ? prodotto.tipologia.nome : 'N/A'}`);
      });
      csvData.push('');
    });
    
    const csv = csvData.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'ordini.csv');
  }
  exportCSVOrdine(ordine: any): void {
    if (!ordine) {
      alert('Ordine non valido');
      return;
    }
    
    const csvData: string[] = [];
    csvData.push(`IdOrdine;Nome;Cognome;Email;Indirizzo;Totale`);
    csvData.push(`${ordine.id};${ordine.utente.nome};${ordine.utente.cognome};${ordine.utente.email};${ordine.utente.indirizzo ? `${ordine.utente.indirizzo.via}, ${ordine.utente.indirizzo.civico}, ${ordine.utente.indirizzo.cap} ${ordine.utente.indirizzo.citta}` : 'N/A'};${ordine.totale}`);
    csvData.push(`Prodotto`);
    csvData.push(`IdProdotto;TitoloProdotto;PrezzoProdotto;QuantitaProdotto;MarcaProdotto;TipologiaProdotto`);
    ordine.prodotti.forEach((prodotto: any) => {
      csvData.push(`${prodotto.id};${prodotto.titolo};${prodotto.prezzo};${prodotto.quantita};${prodotto.marca ? prodotto.marca.nome : 'N/A'};${prodotto.tipologia ? prodotto.tipologia.nome : 'N/A'}`);
    });
    csvData.push('');
    
    const csv = csvData.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `ordine_${ordine.id}.csv`);
  }



}
