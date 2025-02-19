import { Component, OnInit } from '@angular/core';
import { CarrelliService } from '../../services/carrelli.service';
import { AuthService } from '../../auth/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit {

  constructor(private carrelloS: CarrelliService, private authS: AuthService) {}

  listProdotti: any;
  id: any;

  ngOnInit(): void {

    this.id = this.authS.getUserData().id;


    this.carrelloS.getCarrello(this.id).subscribe((resp: any) => {
      if(resp.rc){
        this.listProdotti = resp.dati;
      }
    });


  }

  

}
