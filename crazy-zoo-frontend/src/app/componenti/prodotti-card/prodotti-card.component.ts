import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoCarrelloService } from '../../services/prodotto-carrello.service';


@Component({
  selector: 'app-prodotti-card',
  standalone: false,
  templateUrl: './prodotti-card.component.html',
  styleUrl: './prodotti-card.component.css'
})
export class ProdottiCardComponent implements OnInit{
  constructor(private route:Router,private prodCar:ProdottoCarrelloService){}
  
  @Input() cardData!: { prodotto: any};
  imageUrl: string = '';

  ngOnInit(): void {
    if (this.cardData.prodotto.immagini && this.cardData.prodotto.immagini.length > 0) {
      const base64Data = this.cardData.prodotto.immagini[0].data;
      const contentType = this.cardData.prodotto.immagini[0].tipoFile || 'image/jpeg';
      const blob = this.base64ToBlob(base64Data, contentType);
      this.imageUrl = URL.createObjectURL(blob); // Salva l'URL per l'HTML
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
   // this.prodCar.addProdottoToCarrello({})
   alert("Prodotto con id: " +this.cardData.prodotto.id+ "aggiunto con successo")
  }
  
}
