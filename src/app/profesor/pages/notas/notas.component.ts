import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { ExamenService } from 'src/app/01-services/examen.service';
import { MateriaService } from 'src/app/01-services/materia.service';
import { UserService } from 'src/app/01-services/user.service';
import { TipoMje } from 'src/app/02-models/enums/mje-enum';
import { Examen } from 'src/app/02-models/examen';
import { IdModel } from 'src/app/02-models/idModel';
import { Materia } from 'src/app/02-models/materia';
import { Mensaje } from 'src/app/02-models/mensaje';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  user:User;
  examenes:IdModel<Examen>[];
  examenSeleccionado:IdModel<Examen>;
  estudiantesExamen:IdModel<User>[];
  estudianteSeleccionado:IdModel<User>;
  mensaje:Mensaje;

  constructor(private autService:AuthService, 
      private spinner: NgxSpinnerService,
      private userService:UserService,
      private materiaService: MateriaService,
      private examenService:ExamenService) {     
    this.examenes=[];
    this.estudiantesExamen =[];
  }

  ngOnInit(): void {
    this.mensaje = null;
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();

    this.userService.getExamenes(this.autService.GetUserId())
    .then((items) => {
      items.forEach((item) => {
        const model:IdModel<Examen>={
          id: item.id,
          model: <Examen>item.data()
        };

        this.examenes.push(model);
      })
    })
    .catch((err) => {
      console.log(err);
      this.mensaje = {
        txt:"Ocurrió un error al cargar las exámenes.",
        tipo:TipoMje.Danger
      };
    })
    .finally(()=>{
      this.spinner.hide();
    });
  }

  async seleccionarExamen(examen:IdModel<Examen>){
    this.spinner.show();
    this.estudiantesExamen=[];
    this.mensaje = null;    
    this.examenSeleccionado = examen;

    this.examenService.getEstudiantes(examen.id)
    .then((items) => {
      items.forEach((item) => {
        const model:IdModel<User>={
          id: item.id,
          model: <User>item.data()
        };

        this.estudiantesExamen.push(model);
      })
    })
    .catch((err) => {
      console.log(err);
      this.mensaje = {
        txt:"Ocurrió un error inesperado, vuelva a intentarlo más tarde.",
        tipo:TipoMje.Danger
      };
    })
    .finally(()=>{
      this.spinner.hide();
    });    
  }

  seleccionarUsuario(estudiante:IdModel<User>){
    console.log(estudiante);
    this.estudianteSeleccionado = estudiante;
  }

}
