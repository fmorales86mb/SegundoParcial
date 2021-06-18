import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesExamenComponent } from './estudiantes-examen.component';

describe('EstudiantesExamenComponent', () => {
  let component: EstudiantesExamenComponent;
  let fixture: ComponentFixture<EstudiantesExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
