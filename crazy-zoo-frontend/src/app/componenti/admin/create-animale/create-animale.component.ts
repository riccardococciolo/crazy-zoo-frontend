import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimaliService } from '../../../services/animali.service';

@Component({
  selector: 'app-create-animale',
  standalone: false,
  templateUrl: './create-animale.component.html',
  styleUrl: './create-animale.component.css'
})
export class CreateAnimaleComponent {

    msg: String = '';
    createAnimale: FormGroup = new FormGroup({
        nome: new FormControl('', [Validators.required])
      });


       constructor(
          
          private servT: AnimaliService,
          private routing: Router,
          private route: ActivatedRoute
        ) {}

    onSubmit(){this.servT.createAnimale({nome: this.createAnimale.value.nome}).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/admin/animale']).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }
  

}
