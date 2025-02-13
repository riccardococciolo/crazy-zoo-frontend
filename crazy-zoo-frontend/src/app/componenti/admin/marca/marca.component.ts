import { Component, OnInit } from '@angular/core';
import { MarcheService } from '../../../services/marche.service';
import { ProdottiService } from '../../../services/prodotti.service';

@Component({
  selector: 'app-marca',
  standalone: false,
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent implements OnInit{
  
  

  constructor(private marchS: MarcheService,
    private prodS: ProdottiService
  ){}
  
  listMarca : any
  ngOnInit(): void {
    console.log("caricamento dati..")
    this.marchS.getMarche()
    .subscribe((resp:any)=>{
      this.listMarca = resp.dati
    })
   

  }
  onDelete(id: number) {
    console.log("Delete premuto")
 
    this.marchS.deleteMarche({id}).subscribe(
      (response: any) => {
        if (response.rc) {
          alert("Marca eliminata con successo!");
        }
      }
      )
    }

}
