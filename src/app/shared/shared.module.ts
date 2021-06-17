import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailDirective } from '../04-directives/email.directive';
import { UserListComponent } from './user-list/user-list.component';
import { RolPipe } from '../05-pipes/rol.pipe';
import { MateriaItemComponent } from './materia-item/materia-item.component';
import { CuatrimestrePipe } from '../05-pipes/cuatrimestre.pipe';
import { UserItemComponent } from './user-item/user-item.component';
import { MateriaListComponent } from './materia-list/materia-list.component';
import { MateriaDetalleComponent } from './materia-detalle/materia-detalle.component';
import { AlertComponent } from './alert/alert.component';
import { CalificacionPipe } from '../05-pipes/calificacion.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserRegisterComponent,
    EmailDirective,
    UserItemComponent,
    UserListComponent,
    MateriaItemComponent,
    MateriaListComponent,
    MateriaDetalleComponent,
    AlertComponent,

    //pipes
    RolPipe,
    CuatrimestrePipe,
    CalificacionPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    UserRegisterComponent,
    EmailDirective,
    UserItemComponent,
    UserListComponent,
    MateriaItemComponent,
    MateriaListComponent,
    MateriaDetalleComponent,
    AlertComponent,

    //pipes
    RolPipe,
    CuatrimestrePipe,
    CalificacionPipe
  ]
})
export class SharedModule { }
