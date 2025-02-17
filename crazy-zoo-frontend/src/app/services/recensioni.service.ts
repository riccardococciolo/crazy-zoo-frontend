import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class RecensioniService {

  constructor(private http:HttpClient) { }
  getRecensioniByProdotto(id:any){
    return this.http.get(CONSTANTS.API_URL + "recensioni/listbyprodotto",id)
  }
}
