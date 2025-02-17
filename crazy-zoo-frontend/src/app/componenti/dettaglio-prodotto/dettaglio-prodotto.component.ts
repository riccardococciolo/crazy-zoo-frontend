import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css'
})
export class DettaglioProdottoComponent implements OnInit{
  
  constructor(private prodS: ProdottiService, private router:Router,private route:ActivatedRoute){

  }
  id:any
 infoProd:any
  ngOnInit(): void {
    this.loadProduct()


  }

  loadProduct(){
    this.id= Number(this.route.snapshot.paramMap.get("id"))
    
    this.prodS.getProdotto({id : this.id}).subscribe((resp:any)=>{
      if(resp.rc){
      this.infoProd =resp.dati
      console.log(this.infoProd)
    }else{
      alert("Errore")
    }
    })


    //immagini
    const base64Data = this.infoProd.immagini.data;
    const contentType = 'image/jpeg'; 
    const blob = this.base64ToBlob(base64Data, contentType);
    console.log(blob)
    const file = new File([blob], "nomefile.ext", { type: blob.type });
    console.log(file)
    const imageUrl = URL.createObjectURL(blob);
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
