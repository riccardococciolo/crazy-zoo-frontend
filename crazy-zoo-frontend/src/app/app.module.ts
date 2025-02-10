import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenti/home/home.component';
import { ProdottiComponent } from './componenti/prodotti/prodotti.component';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { DettaglioUtenteComponent } from './componenti/dettaglio-utente/dettaglio-utente.component';
import { CreateProdottoComponent } from './componenti/admin/create-prodotto/create-prodotto.component';
import { UpdateProdottoComponent } from './componenti/admin/update-prodotto/update-prodotto.component';
import { ProdottoComponent } from './componenti/admin/prodotto/prodotto.component';
import { AnimaleComponent } from './componenti/admin/animale/animale.component';
import { CreateAnimaleComponent } from './componenti/admin/create-animale/create-animale.component';
import { UpdateAnimaleComponent } from './componenti/admin/update-animale/update-animale.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { MarcaComponent } from './componenti/admin/marca/marca.component';
import { CreateMarcaComponent } from './componenti/admin/create-marca/create-marca.component';
import { UpdateMarcaComponent } from './componenti/admin/update-marca/update-marca.component';
import { TipologiaComponent } from './componenti/admin/tipologia/tipologia.component';
import { CreateTipologiaComponent } from './componenti/admin/create-tipologia/create-tipologia.component';
import { UpdateTipologiaComponent } from './componenti/admin/update-tipologia/update-tipologia.component';
import { RecensioniComponent } from './componenti/recensioni/recensioni.component';
import { OrdineComponent } from './componenti/ordine/ordine.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './componenti/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProdottiComponent,
    DettaglioProdottoComponent,
    DettaglioUtenteComponent,
    CreateProdottoComponent,
    UpdateProdottoComponent,
    ProdottoComponent,
    AnimaleComponent,
    CreateAnimaleComponent,
    UpdateAnimaleComponent,
    CarrelloComponent,
    MarcaComponent,
    CreateMarcaComponent,
    UpdateMarcaComponent,
    TipologiaComponent,
    CreateTipologiaComponent,
    UpdateTipologiaComponent,
    RecensioniComponent,
    OrdineComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
