import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarcheService } from '../../../services/marche.service';
import { TipologieService } from '../../../services/tipologie.service';
import { AnimaliService } from '../../../services/animali.service';
import { ProdottiService } from '../../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-create-prodotto',
  standalone: false,
  templateUrl: './create-prodotto.component.html',
  styleUrl: './create-prodotto.component.css',
})
export class CreateProdottoComponent {
  marche: any;
  animali: any;
  tipologie: any;
  response: any;
  msg: string = '';
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  createProdotto: FormGroup = new FormGroup({
    titolo: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    tipologia: new FormControl('', Validators.required),
    animale: new FormControl('', Validators.required),
    quantità: new FormControl('', [Validators.required, Validators.min(1)]),
    descrizione: new FormControl('', [Validators.required]),
    prezzo: new FormControl('', [Validators.required]),
  });

  constructor(
    private servM: MarcheService,
    private servT: TipologieService,
    private servA: AnimaliService,
    private servP: ProdottiService,
    private routing: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.servM.getMarche().subscribe((resp) => {
      this.response = resp;
      this.marche = this.response.dati;
    });
    this.servT.getTipologia().subscribe((resp) => {
      this.response = resp;
      this.tipologie = this.response.dati;
    });
    this.servA.getAnimale().subscribe((resp) => {
      this.response = resp;
      this.animali = this.response.dati;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.selectedFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    let formData = new FormData();
    formData.append('titolo', this.createProdotto.get('titolo')?.value);
    formData.append('marcaID', this.createProdotto.get('marca')?.value);
    formData.append('tipologiaID', this.createProdotto.get('tipologia')?.value);
    formData.append('animaleID', this.createProdotto.get('animale')?.value);
    formData.append('quantita', this.createProdotto.get('quantità')?.value);
    formData.append(
      'descrizione',
      this.createProdotto.get('descrizione')?.value
    );
    formData.append('prezzo', this.createProdotto.get('prezzo')?.value);

    this.selectedFiles.forEach((file, index) => {
      formData.append('immagini', file);
    });

    console.log(formData);

    this.servP.createProdotto(formData).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/admin/prodotto']).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
