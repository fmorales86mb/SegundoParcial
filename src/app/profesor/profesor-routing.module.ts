import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorGuard } from '../03-guards/profesor.guard';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { HomeComponent } from './pages/home/home.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { NotasComponent } from './pages/notas/notas.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[ProfesorGuard]},
  {path:'materias', component:MateriasComponent, canActivate:[ProfesorGuard]},
  {path:'notas', component:NotasComponent, canActivate:[ProfesorGuard]},
  {path:'examenes', component:ExamenesComponent, canActivate:[ProfesorGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
