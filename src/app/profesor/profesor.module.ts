import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { MateriasComponent } from './pages/materias/materias.component';


@NgModule({
  declarations: [
    HomeComponent,
    MateriasComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class ProfesorModule { }
