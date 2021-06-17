import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorGuard } from '../03-guards/profesor.guard';
import { HomeComponent } from './pages/home/home.component';
import { MateriasComponent } from './pages/materias/materias.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[ProfesorGuard]},
  {path:'materias', component:MateriasComponent, canActivate:[ProfesorGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
