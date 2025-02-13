import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  constructor(private http: HttpClient) { }
  deleteProdotto(body:{}){
    return this.http.post(CONSTANTS.API_URL + "prodotto/delete",body)
  }
}
