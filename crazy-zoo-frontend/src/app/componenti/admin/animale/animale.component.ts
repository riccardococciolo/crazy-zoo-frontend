import { Component } from '@angular/core';
import { AnimaliService } from '../../../services/animali.service';

@Component({
  selector: 'app-animale',
  standalone: false,
  templateUrl: './animale.component.html',
  styleUrl: './animale.component.css'
})
export class AnimaleComponent {
  listAnimali: any;
  response: any;
  msg: string = '';
  constructor(private animaleSer: AnimaliService) {}

  ngOnInit(): void {
    console.log("caricamento dati..");
    this.animaleSer.getAnimale().subscribe((resp: any) => { 
      this.response = resp;
      this.listAnimali = this.response.dati;
    });
  }

  deleteAction(id: number) {
    console.log("Delete premuto " + id);
    this.animaleSer.deleteAnimale({id: id}).subscribe((response: any) => {
      if (response.rc) {
        alert("Animale eliminato con successo!");
      }
    });
}
}
