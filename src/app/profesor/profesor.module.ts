import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { MateriasComponent } from './pages/materias/materias.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudiantesExamenComponent } from './components/estudiantes-examen/estudiantes-examen.component';
import { NotasComponent } from './pages/notas/notas.component';


@NgModule({
  declarations: [
    HomeComponent,
    MateriasComponent,
    ExamenesComponent,
    EstudiantesExamenComponent,
    NotasComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class ProfesorModule { }
