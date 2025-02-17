import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  constructor(private http: HttpClient) {}
  createProdotto(body: {}) {
    return this.http.post(CONSTANTS.API_URL + 'prodotto/create', body);
  }
  updateProdotto(body: {}) {
    return this.http.post(CONSTANTS.API_URL + 'prodotto/update', body);
  }
  deleteProdotto(formData: FormData) {
    return this.http.post(CONSTANTS.API_URL + 'prodotto/delete', formData);
  }

  getProdotto(
    filters: any
  ) {
    let params = new HttpParams();

    if (filters.id != null) {
      params = params.set('id', filters.id.toString());
    }
    if (filters.titolo) {
      params = params.set('titolo', filters.titolo);
    }
    if (filters.prezzo != null) {
      params = params.set('prezzo', filters.prezzo.toString());
    }
    if (filters.quantita != null) {
      params = params.set('quantita', filters.quantita.toString());
    }
    if (filters.nomeAnimale) {
      params = params.set('nomeAnimale', filters.nomeAnimale);
    }
    if (filters.nomeTipologia) {
      params = params.set('nomeTipologia', filters.nomeTipologia);
    }
    if (filters.nomeMarca) {
      params = params.set('nomeMarca', filters.nomeMarca);
    }
    if (filters.descrizione) {
      params = params.set('descrizione', filters.descrizione);
    }
    console.log(params);
    
    return this.http.get(CONSTANTS.API_URL + 'prodotto/listbyfilter', {
      params,
    });
  }
}
