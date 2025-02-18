import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  private tokenKey = 'auth_token'; 

  //Salva il token in LocalStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  //Recupera il token da LocalStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //Rimuove il token (logout)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  
}
