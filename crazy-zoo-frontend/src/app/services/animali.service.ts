import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimaliService {

  constructor(private http:HttpClient) { }
  createAnimale(body:{}){
    return this.http.post(CONSTANTS.API_URL + "animali/create",body)
  }
  updateAnimale(body:{}){
    return this.http.post(CONSTANTS.API_URL + "animali/update",body)                                                              
  }
  deleteAnimale(body:{}){
    return this.http.post(CONSTANTS.API_URL + "animali/delete",body)
  }
  getAnimale(){
    return this.http.get(CONSTANTS.API_URL+ "animali/listall")
  }

  getAnimaleById(id: number) {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(CONSTANTS.API_URL + 'animali/listbyid', {params});
  }
}


