import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineSuccesComponent } from './ordine-succes.component';

describe('OrdineSuccesComponent', () => {
  let component: OrdineSuccesComponent;
  let fixture: ComponentFixture<OrdineSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdineSuccesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdineSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
