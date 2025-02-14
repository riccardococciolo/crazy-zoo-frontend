import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipologieService } from '../../../services/tipologie.service';

@Component({
  selector: 'app-tipologia',
  standalone: false,
  templateUrl: './tipologia.component.html',
  styleUrl: './tipologia.component.css',
})
export class TipologiaComponent {
  data: any;
  response: any;
  msg: string = '';
  constructor(
    private serv: TipologieService,
    private routing: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serv.getTipologia().subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
    }); 
    console.log(this.data);
  }

  deleteAction(id: number) {
    console.log(id);

    this.serv.deleteTipologia({id:id}).subscribe((resp: any) => {
      if (resp.rc) {
        console.log(resp.rc);

        this.routing.navigate(['/admin/tipologia']).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
