import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenInstalacionComponent } from './imagen-instalacion.component';

describe('ImagenInstalacionComponent', () => {
  let component: ImagenInstalacionComponent;
  let fixture: ComponentFixture<ImagenInstalacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenInstalacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
