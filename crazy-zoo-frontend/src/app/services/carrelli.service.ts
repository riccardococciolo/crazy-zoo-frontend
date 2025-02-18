import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CarrelliService {

  constructor(private http: HttpClient) { }

    createCarrello(body: {}) {
      return this.http.post(CONSTANTS.API_URL + 'carrelli/create', body);
    }

}
