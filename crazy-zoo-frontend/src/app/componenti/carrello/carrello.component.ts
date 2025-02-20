import { Component, OnInit } from '@angular/core';
import { CarrelliService } from '../../services/carrelli.service';
import { AuthService } from '../../auth/auth.service';
import { response } from 'express';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { OrdiniService } from '../../services/ordini.service';




@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('0.3s', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class CarrelloComponent implements OnInit {


  constructor(private carrelloS: CarrelliService, private authS: AuthService, private router: Router, private ordiniS: OrdiniService) {}

  listProdotti: any[] = [];
  id: any;
  imgURL: any;
  listImage: string[] = [];
  totale: number = 0;
  carrelloID: any;
 

  ngOnInit(): void {
    this.id = this.authS.getUserData().id;
    this.carrelloID = this.authS.getUserData().carrelloID;
    console.log(this.carrelloID)

    this.carrelloS.getCarrello(this.id).subscribe((resp: any) => {
      if (resp.rc) {
        this.listProdotti = resp.dati.map((prodotto: any) => {
          if (prodotto.immagini && prodotto.immagini.length > 0) {
            const img = prodotto.immagini[0]; 
            const base64Data = img.data;
            const contentType = img.tipoFile;
            const blob = this.base64ToBlob(base64Data, contentType);
            prodotto.imgURL = URL.createObjectURL(blob);
          } else {
            prodotto.imgURL = 'assets/default-image.jpg';
          }
          return prodotto;
        });
        this.calcolaTotale();
      }
    });
  }

    base64ToBlob(base64: string, contentType: string): Blob {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    }


    rimuoviDalCarrello(prodottoId: number) {
      this.carrelloS.rimuoviProdotto(this.carrelloID, prodottoId).subscribe((resp: any) => {
        if (resp.rc) {
          console.log("Prodotto rimosso con successo");
    
          // 🔥 Rimuove solo una singola istanza del prodotto
          const index = this.listProdotti.findIndex((prodotto: { id: number }) => prodotto.id === prodottoId);
          
          if (index !== -1) {
            this.listProdotti.splice(index, 1); // 🔥 Rimuove SOLO il primo prodotto trovato
          }
    
          // 🔥 Ricalcola il totale dopo la rimozione
          this.calcolaTotale();
        }
      }, error => {
        console.error("Errore nella rimozione del prodotto:", error);
      });
    }
    


  // 🔥 Metodo per calcolare il totale del carrello
  calcolaTotale() {
    this.totale = this.listProdotti.reduce((acc: number, prodotto: { prezzo?: number }) => acc + (prodotto.prezzo || 0), 0);
  }

  completaOrdine() {

    let utenteID = this.id;

    //    this.router.navigate(['/ordine-succes']).then(() => {
    //      window.location.reload();

    this.ordiniS.createOrdine({utenteID}).subscribe((resp: any) => {
      console.log("ordine creato con successo")
    })
    



  }
    
}
      


  


