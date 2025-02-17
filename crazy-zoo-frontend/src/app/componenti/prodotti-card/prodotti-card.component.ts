import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prodotti-card',
  standalone: false,
  templateUrl: './prodotti-card.component.html',
  styleUrl: './prodotti-card.component.css'
})
export class ProdottiCardComponent {
  @Input() cardData!: { prodotto: any};
}
