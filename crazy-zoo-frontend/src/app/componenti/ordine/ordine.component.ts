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
  exportCSV():void{
    if(this.listOrdini.lenght === 0){
      alert("Ordine vouti")
      return
    }
    const csv = Papa.unparse(this.listOrdini.map((ordine: any) => ({
      Id: ordine.id,
      Nome: ordine.utente.nome,
      Cognome: ordine.utente.cognome,
      Email: ordine.utente.email,
      Totale: ordine.totale
    })), { delimiter: ";" });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'ordini.csv');
  }



}
