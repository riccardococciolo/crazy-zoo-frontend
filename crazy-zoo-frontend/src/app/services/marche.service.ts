import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MarcheService {
  constructor(private http: HttpClient) {}

  createMarche(body: {}) {
    return this.http.post(CONSTANTS.API_URL + 'marche/create', body);
  }
  updateMarche(body: {}) {
    return this.http.post(CONSTANTS.API_URL + 'marche/update', body);
  }
  deleteMarche(body: {}) {
    return this.http.post(CONSTANTS.API_URL + 'marche/delete', body);
  }
  getMarche() {
    return this.http.get(CONSTANTS.API_URL + 'marche/listall');
  }
}
