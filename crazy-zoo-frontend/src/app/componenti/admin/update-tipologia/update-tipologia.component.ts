import { Component } from '@angular/core';
import { TipologieService } from '../../../services/tipologie.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-tipologia',
  standalone: false,
  templateUrl: './update-tipologia.component.html',
  styleUrl: './update-tipologia.component.css'
})
export class UpdateTipologiaComponent {
   msg: String = '';
   data: any;
      updateTipologia: FormGroup = new FormGroup({
          nome: new FormControl()
        });
  id: number = 0;
  
  
         constructor(
            
            private servT: TipologieService,
            private routing: Router,
            private route: ActivatedRoute
          ) {}


      ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {

          this.id = +params.get("id")!;
          this.servT.getTipologiaById(this.id).subscribe((resp: any) => {
          this.data = resp.data;
          this.updateTipologia = new FormGroup({
          nome: new FormControl(this.data.nome, [Validators.required]),

        });
      })
    });
      }
  
      onSubmit(){this.servT.updateTipologia({nome: this.updateTipologia.value.nome,id:this.id.toString()}).subscribe((resp: any) => {
        if (resp.rc) {
          this.routing.navigate(['/admin/tipologia']).then(() => {
            window.location.reload();
          });
        } else {
          this.msg = resp.msg;
        }
      });
    }

}
