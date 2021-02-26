import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTorneoComponent } from './nuevo-torneo.component';

describe('NuevoTorneoComponent', () => {
  let component: NuevoTorneoComponent;
  let fixture: ComponentFixture<NuevoTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTorneoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
