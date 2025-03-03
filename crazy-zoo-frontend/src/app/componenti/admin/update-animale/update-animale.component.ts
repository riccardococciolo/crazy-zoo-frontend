import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimaliService } from '../../../services/animali.service';

@Component({
  selector: 'app-update-animale',
  standalone: false,
  templateUrl: './update-animale.component.html',
  styleUrl: './update-animale.component.css',
})
export class UpdateAnimaleComponent {
  
  msg: String = '';
  data: any;
  id: number = 0;

  updateAnimale: FormGroup = new FormGroup({
    nome: new FormControl(),
  });

  constructor(
    private servT: AnimaliService,
    private routing: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')!;
      console.log(this.id);

      this.servT.getAnimaleById(this.id).subscribe((resp: any) => {
        this.data = resp.dati;
        console.log(this.data.nome);

        this.updateAnimale = new FormGroup({
          nome: new FormControl(this.data.nome, [Validators.required]),
        });
      });
    });
  }

  onSubmit() {
    this.servT
      .updateAnimale({
        nome: this.updateAnimale.value.nome,
        id: this.id.toString(),
      })
      .subscribe((resp: any) => {
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
