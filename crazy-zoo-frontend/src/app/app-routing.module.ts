import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AnimaleComponent } from './componenti/admin/animale/animale.component';
import { CreateAnimaleComponent } from './componenti/admin/create-animale/create-animale.component';
import { CreateMarcaComponent } from './componenti/admin/create-marca/create-marca.component';
import { CreateProdottoComponent } from './componenti/admin/create-prodotto/create-prodotto.component';
import { CreateTipologiaComponent } from './componenti/admin/create-tipologia/create-tipologia.component';
import { MarcaComponent } from './componenti/admin/marca/marca.component';
import { ProdottoComponent } from './componenti/admin/prodotto/prodotto.component';
import { TipologiaComponent } from './componenti/admin/tipologia/tipologia.component';
import { UpdateAnimaleComponent } from './componenti/admin/update-animale/update-animale.component';
import { UpdateMarcaComponent } from './componenti/admin/update-marca/update-marca.component';
import { UpdateProdottoComponent } from './componenti/admin/update-prodotto/update-prodotto.component';
import { UpdateTipologiaComponent } from './componenti/admin/update-tipologia/update-tipologia.component';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { DettaglioUtenteComponent } from './componenti/dettaglio-utente/dettaglio-utente.component';
import { ErrorComponent } from './componenti/error/error.component';
import { HomeComponent } from './componenti/home/home.component';
import { LoginComponent } from './componenti/login/login.component';
import { OrdineSuccesComponent } from './componenti/ordine-succes/ordine-succes.component';
import { OrdineComponent } from './componenti/ordine/ordine.component';
import { PrivacyComponent } from './componenti/privacy/privacy.component';
import { ProdottiComponent } from './componenti/prodotti/prodotti.component';
import { RegisterComponent } from './componenti/register/register.component';
import { TerminiComponent } from './componenti/termini/termini.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'privacy', component: PrivacyComponent },
  { path: 'termini', component: TerminiComponent },

  // Login e Registrazione
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Prodotti
  { path: 'prodotti', component: ProdottiComponent },
  { path: 'prodotti/:id', component: DettaglioProdottoComponent },

  // Utente
  { path: 'utente', component: DettaglioUtenteComponent, canActivate: [AuthGuard] },

  { path: 'ordine-succes', component: OrdineSuccesComponent, canActivate: [AuthGuard]},


    // Admin - Sezione Protetta
    {
      path: 'admin',
      canActivate: [AdminGuard], 
      children: [
        { path: 'animale', component: AnimaleComponent },
        { path: 'animale/update/:id', component: UpdateAnimaleComponent },
        { path: 'animale/create', component: CreateAnimaleComponent },
        {path:"ordine", component: OrdineComponent},
  
        { path: 'marca', component: MarcaComponent },
        { path: 'marca/update/:id', component: UpdateMarcaComponent },
        { path: 'marca/create', component: CreateMarcaComponent },
  
        { path: 'prodotto', component: ProdottoComponent },
        { path: 'prodotto/update/:id', component: UpdateProdottoComponent },
        { path: 'prodotto/create', component: CreateProdottoComponent },
  
        { path: 'tipologia', component: TipologiaComponent },
        { path: 'tipologia/update/:id', component: UpdateTipologiaComponent },
        { path: 'tipologia/create', component: CreateTipologiaComponent }
      ]
    },
    
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
