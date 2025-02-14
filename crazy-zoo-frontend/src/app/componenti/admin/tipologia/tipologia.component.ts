import { Component } from '@angular/core';
import { TipologieService } from '../../../services/tipologie.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipologia',
  standalone: false,
  templateUrl: './tipologia.component.html',
  styleUrl: './tipologia.component.css'
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
      console.log('ngOnInit');
      this.serv.getTipologia().subscribe((resp: any) => {
        this.response = resp;
        this.data = this.response.dati;
      });
    }
  
    deleteAction(id: number) {
      console.log(id);
      let formData = new FormData();
      formData.append('id', id.toString());
      console.log(formData);
  
      this.serv.deleteTipologia(formData).subscribe((resp: any) => {
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
