import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { DettaglioUtenteComponent } from './componenti/dettaglio-utente/dettaglio-utente.component';
import { AnimaleComponent } from './componenti/admin/animale/animale.component';
import { UpdateAnimaleComponent } from './componenti/admin/update-animale/update-animale.component';
import { CreateAnimaleComponent } from './componenti/admin/create-animale/create-animale.component';
import { MarcaComponent } from './componenti/admin/marca/marca.component';
import { UpdateMarcaComponent } from './componenti/admin/update-marca/update-marca.component';
import { CreateMarcaComponent } from './componenti/admin/create-marca/create-marca.component';
import { ProdottoComponent } from './componenti/admin/prodotto/prodotto.component';
import { ProdottiComponent } from './componenti/prodotti/prodotti.component';
import { UpdateProdottoComponent } from './componenti/admin/update-prodotto/update-prodotto.component';
import { CreateProdottoComponent } from './componenti/admin/create-prodotto/create-prodotto.component';
import { TipologiaComponent } from './componenti/admin/tipologia/tipologia.component';
import { UpdateTipologiaComponent } from './componenti/admin/update-tipologia/update-tipologia.component';
import { CreateTipologiaComponent } from './componenti/admin/create-tipologia/create-tipologia.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  
  // Prodotti
  { path: 'prodotti', component: ProdottiComponent },
  { path: 'prodotti/:id', component: DettaglioProdottoComponent },

  // Utente
  { path: 'utente', component: DettaglioUtenteComponent },

  // Admin - Animali
  { path: 'admin/animale', component: AnimaleComponent },
  { path: 'admin/animale/update', component: UpdateAnimaleComponent },
  { path: 'admin/animale/create', component: CreateAnimaleComponent },

  // Admin - Marche
  { path: 'admin/marca', component: MarcaComponent },
  { path: 'admin/marca/update', component: UpdateMarcaComponent },
  { path: 'admin/marca/create', component: CreateMarcaComponent },

  // Admin - Prodotti
  { path: 'admin/prodotto', component: ProdottoComponent },
  { path: 'admin/prodotto/update', component: UpdateProdottoComponent },
  { path: 'admin/prodotto/create', component: CreateProdottoComponent },

  // Admin - Tipologie
  { path: 'admin/tipologia', component: TipologiaComponent },
  { path: 'admin/tipologia/update', component: UpdateTipologiaComponent },
  { path: 'admin/tipologia/create', component: CreateTipologiaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
