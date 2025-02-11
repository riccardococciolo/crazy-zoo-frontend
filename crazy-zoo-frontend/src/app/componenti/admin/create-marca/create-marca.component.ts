import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarcheService } from '../../../services/marche.service';

@Component({
  selector: 'app-create-marca',
  standalone: false,
  templateUrl: './create-marca.component.html',
  styleUrl: './create-marca.component.css'
})
export class CreateMarcaComponent  implements OnInit{
  msg: string = ""

  constructor(private marchS: MarcheService){}

  
  ngOnInit():void{
    this.marcheForm = new FormGroup({
      nome : new FormControl(null,Validators.required)
    })
  }
  marcheForm!: FormGroup
  onSubmit(){
    console.log("Premuto pulsante")
    this.marchS.createMarche({
      nome: this.marcheForm.value.nome
    }).subscribe((resp:any) =>{
      if(resp.rc){
        console.log("suc "+ resp)
        this.marcheForm.reset
        
      }else{
        console.log("fail "+ resp)
        this.msg = resp.msg
      }
    })
  }

  

}
