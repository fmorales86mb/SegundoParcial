import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoGuard } from '../03-guards/alumno.guard';
import { HomeComponent } from './pages/home/home.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { MateriasComponent } from './pages/materias/materias.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[AlumnoGuard]},
  {path:'inscripcion', component:InscripcionComponent, canActivate:[AlumnoGuard]},
  {path:'materias', component:MateriasComponent, canActivate:[AlumnoGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
