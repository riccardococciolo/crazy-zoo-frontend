import { Component } from '@angular/core';
import { MarcheService } from '../../../services/marche.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-marca',
  standalone: false,
  templateUrl: './update-marca.component.html',
  styleUrl: './update-marca.component.css'
})
export class UpdateMarcaComponent {
   msg: String = '';
   data: any;
      
  id: number = 0;
  
  updateMarca: FormGroup = new FormGroup({
          nome: new FormControl()
        });

         constructor(
            
            private servT: MarcheService,
            private routing: Router,
            private route: ActivatedRoute
          ) {}


      ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {

          this.id = +params.get("id")!;
          console.log(this.id);
          
          this.servT.getMarcaById(this.id).subscribe((resp: any) => {
          this.data = resp.dati;
          console.log(this.data.nome);
          
          this.updateMarca = new FormGroup({
          nome: new FormControl(this.data.nome, [Validators.required]),

        });
      })
    });
      }
  
      onSubmit(){this.servT.updateMarche({nome: this.updateMarca.value.nome,id:this.id.toString()}).subscribe((resp: any) => {
        if (resp.rc) {
          this.routing.navigate(['/admin/marca']).then(() => {
            window.location.reload();
          });
        } else {
          this.msg = resp.msg;
        }
      });
    }

}

