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
 images: string[] = []
  ngOnInit(): void {
    this.loadProductandRec()


  }

  loadProductandRec(){
    this.id= Number(this.route.snapshot.paramMap.get("id"))
    
    this.prodS.getProdotto({id : this.id}).subscribe((resp:any)=>{
      if(resp.rc){
      this.infoProd =resp.dati
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
