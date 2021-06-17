import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { MateriaService } from 'src/app/01-services/materia.service';
import { IdModel } from 'src/app/02-models/idModel';
import { Materia } from 'src/app/02-models/materia';
import { Mensaje } from 'src/app/02-models/mensaje';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  user:User;
  materias:IdModel<Materia>[];
  mensaje:Mensaje;

  constructor(private autService:AuthService, 
      private spinner: NgxSpinnerService,
      private materiaService: MateriaService) {     
    this.materias=[];
  }

  ngOnInit(): void {
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();

    this.materiaService.snapshots.subscribe((items)=>{
      this.materias = items.filter((i) => {
        if(i.model.estudiantes.some((e) => {
          return e.email == this.user.email;
        })){
          return i;
        }
      })

      this.spinner.hide();
    })
  }
}
