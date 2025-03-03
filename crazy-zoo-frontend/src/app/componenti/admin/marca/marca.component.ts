import { Component } from '@angular/core';
import { MarcheService } from '../../../services/marche.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marca',
  standalone: false,
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css',
})
export class MarcaComponent {
  data: any;
  response: any;
  msg: string = '';
  constructor(
    private serv: MarcheService,
    private routing: Router,
  ) {}

  ngOnInit(): void {
    this.serv.getMarche().subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
    });
    console.log(this.data);
  }

  deleteAction(id: number) {
    console.log(id);

    this.serv.deleteMarche({ id: id }).subscribe((resp: any) => {
      if (resp.rc) {
        console.log(resp.rc);

        this.routing.navigate(['/admin/marca']).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
