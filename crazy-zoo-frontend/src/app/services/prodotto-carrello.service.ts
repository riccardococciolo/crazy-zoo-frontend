import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdottoCarrelloService {

  private carrelloAggiornato = new BehaviorSubject<boolean>(false);
  carrelloAggiornato$ = this.carrelloAggiornato.asObservable();

  constructor(private http: HttpClient) { }

  // Metodo per notificare il carrello dell'aggiornamento
  aggiornaCarrello() {
    this.carrelloAggiornato.next(true);
  }

  // Metodo per aggiungere un prodotto al carrello
  addProdottoToCarrello(body: {}) {
    return this.http.post(CONSTANTS.API_URL + "prodcarr/addprodottotocarrello", body).pipe(
      tap(() => {
        this.aggiornaCarrello(); // 🔥 Notifica il carrello dopo aver aggiunto un prodotto
      })
    );
  }





}
