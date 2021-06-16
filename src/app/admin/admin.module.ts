import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AltaMateriaComponent } from './pages/alta-materia/alta-materia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    AltaMateriaComponent,
    InscripcionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AdminModule { }
