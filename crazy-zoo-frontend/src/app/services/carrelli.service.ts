import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CarrelliService {

  constructor(private http: HttpClient) { }

    createCarrello(body: {}) {
      return this.http.post(CONSTANTS.API_URL + 'carrelli/create', body);
    }

    getCarrello(id: number) {
      let params = new HttpParams().set('id', id.toString());
      return this.http.get(CONSTANTS.API_URL+'carrelli/listbyid', {params});
    }

    rimuoviProdotto(id_carrello: number, id_prodotti: number) {
      const body = { id_carrello, id_prodotti };
      return this.http.post(CONSTANTS.API_URL+'prodcarr/deletepbyid', body);
    }

     
  svuotaCarrello(body: {}) {
    return this.http.post(CONSTANTS.API_URL + 'prodcarr/deletepincarrello', body);
  }

}
