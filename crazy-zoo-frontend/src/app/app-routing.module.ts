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
import { UpdateTipologiaComponent } from './componenti/admin/update-tipologia/update-tipologia.component';
import { CreateTipologiaComponent } from './componenti/admin/create-tipologia/create-tipologia.component';
import { TipologiaComponent } from './componenti/admin/tipologia/tipologia.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { OrdineComponent } from './componenti/ordine/ordine.component';
import { OrdineSuccesComponent } from './componenti/ordine-succes/ordine-succes.component';
import { ErrorComponent } from './componenti/error/error.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

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
