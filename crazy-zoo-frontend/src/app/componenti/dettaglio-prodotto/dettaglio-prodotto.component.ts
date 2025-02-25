import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { RecensioniService } from '../../services/recensioni.service';
import { AuthService } from '../../auth/auth.service';
import { ProdottoCarrelloService } from '../../services/prodotto-carrello.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css'
})
export class DettaglioProdottoComponent implements OnInit{

  quantity: number = 1;  // Quantità corrente (default 1)
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  increment(): void {
    if (this.quantity < this.infoProd[0].quantita) { // Assicurati che la quantità non superi la quantità disponibile
    this.quantity++;
    this.quantityChange.emit(this.quantity);
    }
  }

  decrement(): void {
    if (this.quantity > 1) { // Assicurati che la quantità non vada sotto 1
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
  
  constructor(private prodS: ProdottiService, private router:Router,private route:ActivatedRoute
    ,private recS:RecensioniService, private ut:AuthService, private prodCar : ProdottoCarrelloService)
  {

  }
  id:any
 infoProd:any
 recensioni:any
 images: string[] = []
 selectedRating: number = 0;
  hoverRating: number = 0;
  reviewText: string = '';
  errorMessage: string = '';
  id_carrello: any;
  isLogged: boolean = false;


  ngOnInit(): void {
    if (this.ut.isAuthenticated()) {
      this.id_carrello = this.ut.getUserData().carrelloID;
      this.isLogged = true;
    }
    this.loadProductandRec()


  }

  loadProductandRec(){
    this.id= Number(this.route.snapshot.paramMap.get("id"))
    
    this.prodS.getProdottoAll({id : this.id}).subscribe((resp:any)=>{
      console.log(resp)
      this.infoProd = resp;
      console.log(this.infoProd)
      this.infoProd[0].immagini.forEach((immagine: { data: any }) => {
        const base64Data = immagine.data;
        const contentType = 'image/jpeg'; 
        const blob = this.base64ToBlob(base64Data, contentType);
        console.log(blob)
        const file = new File([blob], "nomefile.ext", { type: blob.type });
        console.log(file)
        const imageUrl = URL.createObjectURL(blob);
        this.images.push(imageUrl);
      });
    })
    this.recS.getRecensioniByProdotto(this.id).subscribe((resp:any)=>{
      if(resp.rc){
        this.recensioni =resp.dati
        console.log("Recensioni:", this.recensioni)
      }else{
        alert("Errore recensioni")
      }
    })


    //immagini
    
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

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  submitReview() {
    console.log("submitReview() chiamato");
    if(!this.selectedRating || !this.reviewText) {
      this.errorMessage = 'Seleziona un voto e scrivi una recensione!';
      return;
    }
    
    // Invia i dati al backend
    const reviewData = {
      valutazione: this.selectedRating,
      descrizione: this.reviewText,
      prodottoID: this.infoProd[0].id,
      utenteID: this.ut.getUserData().id,
    };

    console.log(reviewData)

    this.recS.createRecensioni(reviewData).subscribe((resp: any) => {
      if (resp.rc) {   
          window.location.reload();
      } else {
        this.errorMessage = resp.msg;
      }});

    console.log('Recensione inviata:', reviewData);
    // Resetta il form
    this.selectedRating = 0;
    this.reviewText = '';
    this.errorMessage = '';
  }

  async addCart() {
    let id_prodotti = this.id
    console.log(id_prodotti)

    
      for (let i = 0; i < this.quantity; i++) {
        try {
          const resp: any = await lastValueFrom(
            this.prodCar.addProdottoToCarrello({ id_prodotti, id_carrello: this.id_carrello })
          );
          if (resp.rc) {
            console.log(`Prodotto con id: ${id_prodotti} aggiunto con successo, iterazione: ${i + 1}`);
          } else {
            console.error(`Errore alla chiamata ${i + 1}: ${resp.msg}`);
          }
        } catch (error) {
          console.error(`Errore alla chiamata ${i + 1}:`, error);
        }
      }
    
}


    
}
