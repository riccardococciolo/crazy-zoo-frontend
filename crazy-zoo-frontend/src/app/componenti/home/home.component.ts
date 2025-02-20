import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('heroOverlay') heroOverlay!: ElementRef;
  @ViewChild('homeContent') homeContent!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.heroOverlay || !this.homeContent) {
      console.error("Elementi non trovati!");
    }
  }

  closeHeroPopup(): void {
    if (this.heroOverlay && this.homeContent) {
      this.heroOverlay.nativeElement.classList.add("hidden");
      this.homeContent.nativeElement.classList.add("show");
    }
  }
}