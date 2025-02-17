import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimaliService } from '../../../services/animali.service';

@Component({
  selector: 'app-animale',
  standalone: false,
  templateUrl: './animale.component.html',
  styleUrl: './animale.component.css',
})
export class AnimaleComponent {
  data: any;
  response: any;
  msg: string = '';
  constructor(
    private serv: AnimaliService,
    private routing: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serv.getAnimale().subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
    }); 
    console.log(this.data);
  }

  deleteAction(id: number) {
    console.log(id);

    this.serv.deleteAnimale({id:id}).subscribe((resp: any) => {
      if (resp.rc) {
        console.log(resp.rc);

        this.routing.navigate(['/admin/animale']).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
