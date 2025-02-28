import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../shared/constants';
import { LocalStorageService } from '../utils/local-storage.service';
import { response } from 'express';
import { tap } from 'rxjs/operators';
import { CarrelliService } from '../services/carrelli.service';
import { MailService } from '../services/mail.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private mail: MailService, private http: HttpClient, private router: Router, private localStorage: LocalStorageService, private CarS: CarrelliService) {}
  isRcLog : boolean = false;
  isRcReg : boolean = false;
  /** 🔹 LOGIN - Effettua il login e gestisce la risposta con subscribe */
  login(username: string, password: string): void {
    this.http.post<any>(CONSTANTS.API_URL + 'auth/login', { username, password }).subscribe({
      next: (response) => {
        if (response.rc) {
          this.isRcLog =true;
          this.localStorage.setToken(response.dati.token);
          localStorage.setItem('user_data', JSON.stringify(response.dati));
          localStorage.setItem('user_role', response.dati.role);
        } else {
          
        }
      }
    });
  }

  /** 🔹 LOGOUT - Rimuove il token e reindirizza al login */
  logout(): void {
    this.localStorage.removeToken();
    localStorage.removeItem('user_role');
    console.log('🚪 Logout effettuato!');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
  });
  }

  /** 🔹 Controlla se l'utente è autenticato */
  isAuthenticated(): boolean {
    return !!this.localStorage.getToken();
  }

  /** 🔹 Controlla se l'utente è ADMIN */
  isAdmin(): boolean {
    return localStorage.getItem('user_role') === 'ADMIN';
  }

  /** 🔹 Metodo per ottenere il token JWT */
  getToken(): string | null {
    return this.localStorage.getToken();
  }

    /** 🔹 REGISTRAZIONE - Effettua la registrazione e reindirizza al login */
    register(nome: string, 
             cognome: string, 
             username: string, 
             email: string, 
             cellulare: string,
             via: string,
             civico: string,
             cap: string,
             citta: string, 
             password: string): void {
      const requestBody = { nome, cognome, username, email, cellulare, via, civico, cap, citta, password };
      
      this.http.post<any>(CONSTANTS.API_URL + 'auth/register', requestBody).subscribe({
        next: (response) => {
          if (response.rc) {
            this.isRcReg = true;
            this.mail.sendEmail(email).subscribe((response:any) =>{
              if(response.rc){
                console.log("Email inviata a " +  email)
              }
            })
            this.CarS.createCarrello({utenteID: response.dati.id}).subscribe
            ((resp: any) => {
              if(resp.rc) {
                console.log("Carrello creato con successo")
              }
            })
            this.router.navigate(['/login']);
          }
        }
      });
    }

    getUserData(): any {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }

}
