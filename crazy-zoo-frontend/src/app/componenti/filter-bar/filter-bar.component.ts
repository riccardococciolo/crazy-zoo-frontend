import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MarcheService } from '../../services/marche.service';
import { AnimaliService } from '../../services/animali.service';
import { TipologieService } from '../../services/tipologie.service';

@Component({
  selector: 'app-filter-bar',
  standalone: false,
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css',
})
export class FilterBarComponent {
  filtersForm: FormGroup;

  response: any;
  animali: any;
  marche: any;
  tipologie: any;

  minPrice = 0;
  maxPrice = 100;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servM: MarcheService,
    private servA: AnimaliService,
    private servT: TipologieService
  ) {
    console.log(this.minPrice);

    this.filtersForm = this.fb.group({
      titolo: [],
      nomeMarca: [],
      nomeTipologia: [],
      nomeAnimale: [],
    });
  }

  ngOnInit(): void {
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

  applyFilters(): void {
    // Recupera i valori dal form

    let filters = this.filtersForm.value;

    filters.minPrice = this.minPrice;
    filters.maxPrice = this.maxPrice;

    console.log(this.filtersForm.value);

    // Rimuovi eventuali campi vuoti per non inviare parametri inutili
    Object.keys(filters).forEach((key) => {
      if (filters[key] === '' || filters[key] == null) {
        delete filters[key];
      }
    });

    this.filtersForm.reset({
      titolo: '',
      nomeMarca: '',
      nomeAnimale: '',
      nomeTipologia: '',
    });

    // Resetta i valori dello slider
    this.minPrice = 0;
    this.maxPrice = 100;
    // Naviga alla pagina dei prodotti passando i filtri come query parameters
    this.router.navigate(['/prodotti'], { queryParams: filters });
  }

  deseleziona(controlName: string, value: any): void {
    const currentValue = this.filtersForm.get(controlName)?.value;
    if (currentValue === value) {
      // Se l'utente clicca nuovamente sull'opzione già selezionata, resettala
      this.filtersForm.get(controlName)?.setValue(null);
    }
  }
}
