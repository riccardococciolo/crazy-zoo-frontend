import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipologieService {

  constructor(private http: HttpClient) { }
  createTipologia(body:{}){
      return this.http.post(CONSTANTS.API_URL + "tipologie/create",body)
    }
    updateTipologia(body:{}){
      return this.http.post(CONSTANTS.API_URL + "tipologie/update",body) //id
                                                                      //nome
    }
    deleteTipologia(body:{}){
      return this.http.post(CONSTANTS.API_URL + "tipologie/delete",body)
    }
    getTipologia(){
      return this.http.get(CONSTANTS.API_URL+ "tipologie/list")
    }
}
