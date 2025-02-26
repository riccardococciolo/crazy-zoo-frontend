import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoCarrelloService } from '../../services/prodotto-carrello.service';
import { AuthService } from '../../auth/auth.service';
import { response } from 'express';


@Component({
  selector: 'app-prodotti-card',
  standalone: false,
  templateUrl: './prodotti-card.component.html',
  styleUrl: './prodotti-card.component.css'
})
export class ProdottiCardComponent implements OnInit{

  constructor(private prodCar: ProdottoCarrelloService, private authS: AuthService) {}



  id_carrello: any;
  isLogged: boolean = false;
  soldOut: boolean = false;

  @Input() cardData!: { prodotto: any };
  imageUrl: string = '';

  ngOnInit(): void {
    if (this.authS.isAuthenticated()) {
      this.id_carrello = this.authS.getUserData().carrelloID;
      this.isLogged = true;
    }

    if (this.cardData.prodotto.immagini && this.cardData.prodotto.immagini.length > 0) {
      const base64Data = this.cardData.prodotto.immagini[0].data;
      const contentType = this.cardData.prodotto.immagini[0].tipoFile || 'image/jpeg';
      const blob = this.base64ToBlob(base64Data, contentType);
      this.imageUrl = URL.createObjectURL(blob);
    }

    if (this.cardData.prodotto.quantita == 0) {
      this.soldOut = true;
      console.log("Prodotto esaurito" + this.cardData.prodotto.id);
    }
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

  addCart() {
    let id_prodotti = this.cardData.prodotto.id;

    this.prodCar.addProdottoToCarrello({ id_prodotti, id_carrello: this.id_carrello }).subscribe((resp: any) => {
      if (resp.rc) {
        console.log("Prodotto con id: " + this.cardData.prodotto.id + " aggiunto con successo");
      }
    });
  }

  
}
