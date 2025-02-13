import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcheService {
  

  constructor(private http: HttpClient) { }


  createMarche(body:{}){
    return this.http.post(CONSTANTS.API_URL + "marche/create",body)
  }
  updateMarche(body:{}){
    return this.http.post(CONSTANTS.API_URL + "marche/update",body) //id
                                                                    //nome
  }
  deleteMarche(body:{}){
    return this.http.post(CONSTANTS.API_URL + "marche/delete",body)
  }
  getMarche(){
    return this.http.get(CONSTANTS.API_URL+ "marche/listall")
  }
  getMarcheById(id:number){
    let params = new HttpParams().set("id", id.toString())
    return this.http.get(CONSTANTS.API_URL + "marche/listbyid",{params})

  }
}
