import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipologieService } from '../../../services/tipologie.service';

@Component({
  selector: 'app-create-tipologia',
  standalone: false,
  templateUrl: './create-tipologia.component.html',
  styleUrl: './create-tipologia.component.css'
})
export class CreateTipologiaComponent {

    msg: String = '';
    createTipologia: FormGroup = new FormGroup({
        nome: new FormControl('', [Validators.required])
      });


       constructor(
          
          private servT: TipologieService,
          private routing: Router,
          private route: ActivatedRoute
        ) {}

    onSubmit(){this.servT.createTipologia({nome: this.createTipologia.value.nome}).subscribe((resp: any) => {
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
