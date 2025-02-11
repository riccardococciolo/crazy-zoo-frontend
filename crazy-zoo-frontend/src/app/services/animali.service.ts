import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimaliService {

  constructor(private http:HttpClient) { }
  createAnimale(body:{}){
    return this.http.post(CONSTANTS.API_URL + "animali/create",body)
  }
  updateAnimale(body:{}){
    return this.http.post(CONSTANTS.API_URL + "animali/update",body) //id
                                                                    //nome
  }
  deleteAnimale(body:{}){
    return this.http.post(CONSTANTS.API_URL + "animali/delete",body)
  }
  getAnimale(){
    return this.http.get(CONSTANTS.API_URL+ "animali/list")
  }
}


