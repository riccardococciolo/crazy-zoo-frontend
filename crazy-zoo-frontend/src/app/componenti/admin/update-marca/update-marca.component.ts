import { Component, OnInit } from '@angular/core';
import { MarcheService } from '../../../services/marche.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-marca',
  standalone: false,
  templateUrl: './update-marca.component.html',
  styleUrl: './update-marca.component.css'
})
export class UpdateMarcaComponent implements OnInit{
  marcaId: any;
  marcaForm: FormGroup = new FormGroup({
    id: new FormControl(),
    nome: new FormControl()
  });
  datiMarca: any;

  constructor(
    private marcS: MarcheService,
    private route: ActivatedRoute,
    private router: Router // ✅ Usa il nome corretto
  ) {}

  ngOnInit(): void {
    this.marcaId = Number(this.route.snapshot.paramMap.get("id"));

    this.marcS.getMarcheById(this.marcaId).subscribe((response: any) => {
      this.datiMarca = response.dati;
      this.marcaForm = new FormGroup({
        id: new FormControl(this.datiMarca.id),
        nome: new FormControl(this.datiMarca.nome, Validators.required)
      });
    });
  }

  onUpdate() {
    console.log("Tasto premuto");
    if (this.marcaForm.valid) {
      this.marcS.updateMarche(this.marcaForm.value).subscribe((response: any) => {
        if (response.rc) {
          console.log("rc  " + response.rc);
          this.router.navigate(["admin/marca"]).then(() =>{
            window.location.reload(); //non va
          })
        }
      });
    }
  }

}
