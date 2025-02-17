import { Component } from '@angular/core';
import { ProdottiService } from '../../../services/prodotti.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MarcheService } from '../../../services/marche.service';
import { TipologieService } from '../../../services/tipologie.service';
import { AnimaliService } from '../../../services/animali.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-prodotto',
  standalone: false,
  templateUrl: './update-prodotto.component.html',
  styleUrl: './update-prodotto.component.css'
})
export class UpdateProdottoComponent {
  marche: any;
    animali: any;
    data: any;
    tipologie: any;
    response: any;
    id: number = 0;
    msg: string = '';
    imagePreviews: string[] = [];
    selectedFiles: File[] = [];
    updateProdotto: FormGroup = new FormGroup({
      titolo: new FormControl(),
      marca: new FormControl(),
      tipologia: new FormControl(),
      animale: new FormControl(),
      quantità: new FormControl(),
      descrizione: new FormControl(),
      prezzo: new FormControl(),
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
      
      this.route.paramMap.subscribe((params: ParamMap) => {
       
        this.id = +params.get("id")!;

        console.log(this.id);
        
    
        this.servP.getProdotto({id: this.id}).subscribe((resp) => {
          this.response = resp;
          this.data = this.response.dati;
          console.log(this.data[0]);
          this.caricaDati();
          this.updateProdotto = new FormGroup({
            titolo: new FormControl(this.data[0].titolo, [Validators.required]),
            marca: new FormControl(this.data[0].marca.id, [Validators.required]),
            tipologia: new FormControl(this.data[0].tipologia.id, Validators.required),
            animale: new FormControl(this.data[0].animale.id, Validators.required),
            quantità: new FormControl(this.data[0].quantita, [Validators.required, Validators.min(1)]),
            descrizione: new FormControl(this.data[0].descrizione, [Validators.required]),
            prezzo: new FormControl(this.data[0].prezzo, [Validators.required]),
          });
          this.data[0].immagini.forEach((immagine: { data: any }) => {
            const base64Data = immagine.data;
            const contentType = 'image/jpeg'; 
            const blob = this.base64ToBlob(base64Data, contentType);
            console.log(blob)
            const file = new File([blob], "nomefile.ext", { type: blob.type });
            this.selectedFiles.push(file);
            console.log(file)
            const imageUrl = URL.createObjectURL(blob);
            this.imagePreviews.push(imageUrl);
          });
          console.log(this.imagePreviews);
          
        });
      });
    }

    removeImage(index: number): void {
      if (index > -1) {
        this.selectedFiles.splice(index, 1);
        this.imagePreviews.splice(index, 1);
      }
    }

    base64ToBlob(base64: string, contentType: string): Blob {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    }

    caricaDati() {
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
      formData.append('id', this.id.toString());
      formData.append('titolo', this.updateProdotto.get('titolo')?.value);
      formData.append('marcaID', this.updateProdotto.get('marca')?.value);
      formData.append('tipologiaID', this.updateProdotto.get('tipologia')?.value);
      formData.append('animaleID', this.updateProdotto.get('animale')?.value);
      formData.append('quantita', this.updateProdotto.get('quantità')?.value);
      formData.append(
        'descrizione',
        this.updateProdotto.get('descrizione')?.value
      );
      formData.append('prezzo', this.updateProdotto.get('prezzo')?.value);
  
      this.selectedFiles.forEach((file, index) => {
        formData.append('immagini', file);
      });
  
      console.log("dati req" + this.updateProdotto.get('tipologia')?.value);
  
      this.servP.updateProdotto(formData).subscribe((resp: any) => {
        if (resp.rc) {
          this.routing.navigate(['/admin/prodotto']).then(() => {
            /* window.location.reload(); */
          });
        } else {
          this.msg = resp.msg;
        }
      });
    }
}
