import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class RecensioniService {

  constructor(private http:HttpClient) { }
  getRecensioniByProdotto(id:number){
    let params = new HttpParams().set("id", id.toString())
    console.log(CONSTANTS.API_URL + "recensioni/listbyprodotto" + {params})
    return this.http.get(CONSTANTS.API_URL + "recensioni/listbyprodotto",{params})
  }
}
