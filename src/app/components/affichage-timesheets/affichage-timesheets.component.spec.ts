import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageTimesheetsComponent } from './affichage-timesheets.component';

describe('AffichageTimesheetsComponent', () => {
  let component: AffichageTimesheetsComponent;
  let fixture: ComponentFixture<AffichageTimesheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageTimesheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageTimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
