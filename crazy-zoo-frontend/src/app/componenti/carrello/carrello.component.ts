import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarrelliService } from '../../services/carrelli.service';
import { AuthService } from '../../auth/auth.service';
import { response } from 'express';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { OrdiniService } from '../../services/ordini.service';
import { lastValueFrom, Subscription } from 'rxjs';
import { ProdottoCarrelloService } from '../../services/prodotto-carrello.service';
import { get } from 'node:http';
import { MailService } from '../../services/mail.service';




@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css',
  /* animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('0.3s', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ] */
})
export class CarrelloComponent implements OnInit {


  constructor(private mailS : MailService, private carrelloS: CarrelliService, private authS: AuthService, private router: Router, private ordiniS: OrdiniService, private prodCarS: ProdottoCarrelloService) {}

  listProdotti: any[] = [];
  id: any;
  imgURL: any;
  listImage: string[] = [];
  totale: number = 0;
  carrelloID: any;
  loaderQ: boolean = false;
  loaderP: boolean = false;
  showAlert = false;
  alertMessage = '';
  private carrelloSub: Subscription | null = null; 

  @Output() numeroProdotti = new EventEmitter<string>();


  ngOnInit(): void {
    this.id = this.authS.getUserData().id;
    this.carrelloID = this.authS.getUserData().carrelloID;
    this.caricaCarrello();
    console.log(this.loaderP);
    
    
    // 🔥 Ascolta gli aggiornamenti del carrello
    this.carrelloSub = this.prodCarS.carrelloAggiornato$.subscribe(() => {
      this.caricaCarrello();
      this.calcolaTotale();
      console.log(this.loaderP);
     
    })
  }

  caricaCarrello() {
    this.carrelloS.getCarrello(this.id).subscribe((resp: any) => {
      this.loaderP = true;
      if (resp.rc) {
        this.loaderP = false;
        this.numeroProdotti.emit(resp.dati.length);
        console.log(this.loaderP);
        this.listProdotti = resp.dati.map((prodotto: any) => {
          if (prodotto.immagini && prodotto.immagini.length > 0) {
            const img = prodotto.immagini[0];
            const base64Data = img.data;
            const contentType = img.tipoFile;
            const blob = this.base64ToBlob(base64Data, contentType);
            prodotto.imgURL = URL.createObjectURL(blob);
            this.getProdottiRaggruppati();
            console.log(this.getProdottiRaggruppati());
            
            
          } else {
            prodotto.imgURL = 'assets/default-image.jpg';
            this.loaderP = false;
          }
         
            
            return prodotto;
        }); 
        this.calcolaTotale();
      }
    });
  }

  getProdottiRaggruppati(): any[] {
    const mappaProdotti = new Map();
    console.log(mappaProdotti);
  
    for (const prodotto of this.listProdotti) {
      if (mappaProdotti.has(prodotto.id)) {
        mappaProdotti.get(prodotto.id).quantita++;
      } else {
        mappaProdotti.set(prodotto.id, {
          ...prodotto,
          quantita: 1
        });
      }
    }
    
    return Array.from(mappaProdotti.values());
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

  calcolaTotale() {
    this.totale = this.listProdotti.reduce((acc: number, prodotto: { prezzo?: number }) => acc + (prodotto.prezzo || 0), 0);
  }

  ngOnDestroy(): void {
    if (this.carrelloSub) { // ✅ Controlla che carrelloSub non sia null
      this.carrelloSub.unsubscribe();
    }
  }
 





    rimuoviDalCarrello(prodottoId: number) {
      this.loaderP = true;
      this.carrelloS.rimuoviProdotto(this.carrelloID, prodottoId).subscribe((resp: any) => {
        if (resp.rc) {
          console.log("Prodotto rimosso con successo");
    
          // 🔥 Rimuove solo una singola istanza del prodotto
          const index = this.listProdotti.findIndex((prodotto: { id: number }) => prodotto.id === prodottoId);
          
          if (index !== -1) {
            this.listProdotti.splice(index, 1); // 🔥 Rimuove SOLO il primo prodotto trovato
          }
          this.caricaCarrello();
        }
      }, error => {
        console.error("Errore nella rimozione del prodotto:", error);
      });

    }

    async rimuoviProdottoDalCarrello(prodottoId: number, prodotto: number) {
      console.log(prodotto);

      this.loaderP = true;
      
      console.log(this.getProdottiRaggruppati()[prodotto]);
      
      for (let index = 0; index < this.getProdottiRaggruppati()[prodotto].quantita; index++) {
        try {
          const resp: any = await lastValueFrom(
        this.carrelloS.rimuoviProdotto(this.carrelloID, prodottoId)
      );
        if (resp.rc) {
          console.log("Prodotto rimosso con successo");

        }
    } catch (error) {
      console.error(`Errore alla chiamata ${+ 1}:`, error);
    };
        
      }
      this.caricaCarrello();
      this.loaderP = true;
      this.calcolaTotale();
      
    }

    aggiungiAlCarrello(prodotto: number, index : number): void {
      console.log(index);
      this.loaderP = true;

      const prodottoEsistente = this.listProdotti.find(p => p.id === prodotto);

      console.log(prodottoEsistente);
      
      console.log(this.getProdottiRaggruppati()[index]);
      
      if(this.getProdottiRaggruppati()[index].quantita < prodottoEsistente.quantita) {
      
      this.prodCarS.addProdottoToCarrello({id_carrello: this.carrelloID, id_prodotti: prodotto}).subscribe((resp: any) => {
        if (resp.rc) {
          console.log("Prodotto aggiunto con successo");
          
         
          this.calcolaTotale();
          this.caricaCarrello();
        }
      }, error => {
        console.error("Errore nella aggiunta del prodotto:", error);
      });
    }
      
  }
    



    completaOrdine() {
      let utenteID = this.id;

      this.loaderP = true;
  
      this.ordiniS.createOrdine({ utenteID }).subscribe((resp: any) => {
        if (resp.rc) {
          console.log("Ordine creato con successo!");
          this.inviaEmail(resp.dati.id)
          this.loaderP = false;
          // 🔥 Svuota il carrello dopo la creazione dell'ordine
          this.svuotaCarrello();
          this.caricaCarrello();
          this.onOrdineAggiunto();
          
        }
      }, error => {
        console.error("Errore durante la creazione dell'ordine:", error);
      }); 
      
    }

    onOrdineAggiunto() {
      this.alertMessage = "Ordine completato!";
      this.showAlert = true;
      
      setTimeout(() => this.showAlert = false, 3000);
    }
  
    svuotaCarrello() {
      
      this.carrelloS.svuotaCarrello({carrelloID : this.carrelloID}).subscribe((resp: any) => {
        if (resp.rc) {
          console.log("Carrello svuotato con successo");
          this.loaderP = false;
          // 🔥 Aggiorna l'interfaccia utente
          this.listProdotti = [];
          this.totale = 0;
        }
      }, error => {
        console.error("Errore nello svuotamento del carrello:", error);
      });
    }

    inviaEmail(id : number){
      this.mailS.sendEmailWithAttach(id).subscribe((resp:any)=>{
        if(resp.rc){
          console.log("Email inviata con successo")
        }
      })
      
      

    }
    



  }
    

      


  


