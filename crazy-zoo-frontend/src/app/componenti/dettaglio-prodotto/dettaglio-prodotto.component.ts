import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { RecensioniService } from '../../services/recensioni.service';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css'
})
export class DettaglioProdottoComponent implements OnInit{
  
  constructor(private prodS: ProdottiService, private router:Router,private route:ActivatedRoute
    ,private recS:RecensioniService)
  {

  }
  id:any
 infoProd:any
 recensioni:any
  ngOnInit(): void {
    this.loadProductandRec()


  }

  loadProductandRec(){
    this.id= Number(this.route.snapshot.paramMap.get("id"))
    
    this.prodS.getProdotto({id : this.id}).subscribe((resp:any)=>{
      if(resp.rc){
      this.infoProd =resp.dati
      console.log(this.infoProd)
    }else{
      alert("Errore")
    }
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


    
}
