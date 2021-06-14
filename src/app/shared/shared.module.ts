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

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserRegisterComponent,
    EmailDirective,
    UserListComponent,
    RolPipe
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
    UserListComponent,
    RolPipe
  ]
})
export class SharedModule { }
