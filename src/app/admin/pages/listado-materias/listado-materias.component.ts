import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { MateriaService } from 'src/app/01-services/materia.service';
import { IdModel } from 'src/app/02-models/idModel';
import { Materia } from 'src/app/02-models/materia';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.css']
})
export class ListadoMateriasComponent implements OnInit {

  user:User;
  users:IdModel<User>[];
  materias:IdModel<Materia>[];

  constructor(private autService:AuthService, 
      private spinner: NgxSpinnerService,
      private materiaService: MateriaService) { 
    this.users=[];
    this.materias=[];
  }

  ngOnInit(): void {
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();

    this.materiaService.snapshots.subscribe((items) => {
      this.materias = items;
      this.spinner.hide();
    })
  }

  seleccionarMateria(materia:IdModel<Materia>){
    this.users = materia.model.estudiantes.map((item) => {
      const us:IdModel<User> = {
        id:"",
        model:item
      };
      return us;
    });
  }
}
