import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { OrdiniService } from '../../services/ordini.service';
import { UtentiService } from '../../services/utenti.service';

@Component({
  selector: 'app-dettaglio-utente',
  standalone: false,
  templateUrl: './dettaglio-utente.component.html',
  styleUrl: './dettaglio-utente.component.css',
})
export class DettaglioUtenteComponent {
  user: any = null;
  isAdmin: boolean = false;
  ordini: any[] = []; 
  rc: any;
  dataUser: any;
  loaderU: boolean = false;
  loaderO: boolean = false;

  constructor(
    private authService: AuthService,
    private ordineService: OrdiniService,
    private utenteS: UtentiService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.isAdmin = this.authService.isAdmin();

    if (this.user?.id) {
      this.loadOrdini(this.user.id);
      this.loadUser(this.user.id);
    }
  }

  loadOrdini(userId: number): void {
    (this.loaderO = true),
      this.ordineService.listByUtente(userId).subscribe(
        (data: any) => {
          console.log('Debug ordine', data);

          if (data.dati && Array.isArray(data.dati)) {
            this.ordini = data.dati.map((ordine: any) => {
              ordine.prodotti = ordine.prodotti.map((prodotto: any) => {
                if (prodotto.immagini && prodotto.immagini.length > 0) {
                  const img = prodotto.immagini[0];
                  const base64Data = img.data;
                  const contentType = img.tipoFile;
                  const blob = this.base64ToBlob(base64Data, contentType);
                  prodotto.imgURL = URL.createObjectURL(blob);
                } else {
                  prodotto.imgURL = 'assets/default-image.jpg';
                }
                return prodotto;
              });
              ordine.prodotti = this.getProdottiRaggruppati(ordine.prodotti);
              return ordine;
            });
          } else {
            console.error('Formato della risposta inatteso:', data);
          }

          this.rc = data.rc;
          this.loaderO = false;
        },
        (error) => {
          console.error('Errore nel recupero degli ordini:', error);
        }
      );
  }

  getProdottiRaggruppati(prodotti: any[]): any[] {
    const mappaProdotti = new Map();

    for (const prodotto of prodotti) {
      if (mappaProdotti.has(prodotto.id)) {
        mappaProdotti.get(prodotto.id).quantita++;
      } else {
        mappaProdotti.set(prodotto.id, { ...prodotto, quantita: 1 });
      }
    }

    return Array.from(mappaProdotti.values());
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  loadUser(id: number) {
    this.loaderU = true;
    this.utenteS.getUtenteById(id).subscribe((resp: any) => {
      this.dataUser = resp.dati;
      this.loaderU = false;
    });
  }
}
