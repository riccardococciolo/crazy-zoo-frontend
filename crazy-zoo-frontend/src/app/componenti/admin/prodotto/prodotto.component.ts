import { Component } from '@angular/core';
import { ProdottiService } from '../../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prodotto',
  standalone: false,
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.css',
})
export class ProdottoComponent {
  data: any;
  response: any;
  msg: string = '';
  loader: boolean = false;
  alertMessage: string | null = null;

  constructor(
    private serv: ProdottiService,
    private routing: Router,
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    const navigation = this.routing.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['alertMessage']) {
      this.alertMessage = navigation.extras.state['alertMessage'];

      console.log(this.alertMessage);
    }
    this.loader = true;
    this.serv.getProdottoAll({}).subscribe((resp) => {
      this.response = resp;
      this.data = this.response;
      this.loader = false;
    });
  }

  deleteAction(id: number) {
    console.log(id);
    let formData = new FormData();
    formData.append('id', id.toString());
    console.log(formData);

    this.serv.deleteProdotto(formData).subscribe((resp: any) => {
      if (resp.rc) {
        console.log(resp.rc);

        this.routing.navigate(['/admin/prodotto']).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = resp.msg;
      }
    });
  }
}
