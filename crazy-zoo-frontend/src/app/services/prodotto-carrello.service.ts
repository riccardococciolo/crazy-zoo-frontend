import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProdottoCarrelloService {

  constructor(private http: HttpClient) { }
  addProdottoToCarrello(body:{}){
    return this.http.post(CONSTANTS.API_URL + "prodcarr/addprodottotocarrello",body)
  }
}
