import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaInstalacionComponent } from './nueva-instalacion.component';

describe('NuevaInstalacionComponent', () => {
  let component: NuevaInstalacionComponent;
  let fixture: ComponentFixture<NuevaInstalacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaInstalacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
