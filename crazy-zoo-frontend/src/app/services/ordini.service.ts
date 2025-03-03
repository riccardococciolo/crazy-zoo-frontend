import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class OrdiniService {
  constructor(private http: HttpClient) {}

  createOrdine(body: {}) {
    return this.http.post(CONSTANTS.API_URL + 'ordini/create', body);
  }

  listAll() {
    return this.http.get(CONSTANTS.API_URL + 'ordini/listall');
  }

  listByUtente(id: number) {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(CONSTANTS.API_URL + 'ordini/listbyutente', { params });
  }
}
