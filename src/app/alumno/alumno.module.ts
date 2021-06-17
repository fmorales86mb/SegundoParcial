import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { MateriasComponent } from './pages/materias/materias.component';


@NgModule({
  declarations: [
    HomeComponent,
    InscripcionComponent,
    MateriasComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AlumnoModule { }
