import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../03-guards/admin.guard';
import { AltaMateriaComponent } from './pages/alta-materia/alta-materia.component';
import { HomeComponent } from './pages/home/home.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[AdminGuard]},
  {path:'register', component:RegisterComponent, canActivate:[AdminGuard]},
  {path:'materia', component:AltaMateriaComponent, canActivate:[AdminGuard]},
  {path:'inscripcion', component:InscripcionComponent, canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
