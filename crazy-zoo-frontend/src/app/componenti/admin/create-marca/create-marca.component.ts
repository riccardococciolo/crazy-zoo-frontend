import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcheService } from '../../../services/marche.service';

@Component({
  selector: 'app-create-marca',
  standalone: false,
  templateUrl: './create-marca.component.html',
  styleUrl: './create-marca.component.css',
})
export class CreateMarcaComponent {
  msg: String = '';
  createMarca: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  constructor(
    private servT: MarcheService,
    private routing: Router,
  ) {}

  onSubmit() {
    this.servT
      .createMarche({ nome: this.createMarca.value.nome })
      .subscribe((resp: any) => {
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
