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
    id?: number,
    titolo?: string,
    prezzo?: number,
    quantita?: number,
    nomeAnimale?: string,
    nomeTipologia?: string,
    nomeMarca?: string,
    descrizione?: string
  ) {
    let params = new HttpParams();

    if (id != null) {
      params = params.set('id', id.toString());
    }
    if (titolo) {
      params = params.set('titolo', titolo);
    }
    if (prezzo != null) {
      params = params.set('prezzo', prezzo.toString());
    }
    if (quantita != null) {
      params = params.set('quantita', quantita.toString());
    }
    if (nomeAnimale) {
      params = params.set('nomeAnimale', nomeAnimale);
    }
    if (nomeTipologia) {
      params = params.set('nomeTipologia', nomeTipologia);
    }
    if (nomeMarca) {
      params = params.set('nomeMarca', nomeMarca);
    }
    if (descrizione) {
      params = params.set('descrizione', descrizione);
    }
    return this.http.get(CONSTANTS.API_URL + 'prodotto/listbyfilter', {
      params,
    });
  }
}
