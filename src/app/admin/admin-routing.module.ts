import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../03-guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
