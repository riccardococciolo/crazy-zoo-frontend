import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http : HttpClient) { }
  sendEmailWithAttach(id:number){
    let params = new HttpParams().set("id", id.toString())
    return this.http.get(CONSTANTS.API_URL + "ricevuta/send", {params})
  }
  sendEmail(to : any){
    let body = {to}
    return this.http.post(CONSTANTS.API_URL + "mail/registermail", body)
  }
}
