import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AltaMateriaComponent } from './pages/alta-materia/alta-materia.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    AltaMateriaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AdminModule { }
