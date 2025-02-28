import { Component, OnInit } from '@angular/core';
import { UtentiService } from '../../../services/utenti.service';

@Component({
  selector: 'app-utente',
  standalone: false,
  templateUrl: './utente.component.html',
  styleUrl: './utente.component.css'
})
export class UtenteComponent implements OnInit{

  isRc : boolean = false
  loader : boolean = false

  successMSG : any
  constructor(private utenteS:UtentiService){}
  listUser : any
  ngOnInit(): void {
    this.loadUsers()
  }
  loadUsers() {
    this.loader = true
   this.utenteS.getListUtente().subscribe((resp:any) =>{
    if(resp.rc){
      this.loader = false;
        this.listUser = resp.dati
    }
   })
  }
  setAdmin(id:any) {
    let param =+ id
    console.log("id setadmin "+ param)
   this.utenteS.setAdmin(param).subscribe((response:any) => {
    if(response.rc){
      this.isRc = true
      this.successMSG = "Ruolo aggiornato con successo"
      this.loadUsers()
    }
   })
    }

}
