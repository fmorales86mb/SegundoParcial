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

    //pipes
    RolPipe,
    CuatrimestrePipe
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
    
    //pipes
    RolPipe,
    CuatrimestrePipe
  ]
})
export class SharedModule { }
