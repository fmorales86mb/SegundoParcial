import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { MateriaService } from 'src/app/01-services/materia.service';
import { UserService } from 'src/app/01-services/user.service';
import { TipoMje } from 'src/app/02-models/enums/mje-enum';
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
  materiaSeleccionada:IdModel<Materia>;
  estudiantesMateria:IdModel<User>[];
  mensaje:Mensaje;

  constructor(private autService:AuthService, 
      private spinner: NgxSpinnerService,
      private userService:UserService,
      private materiaService: MateriaService) {     
    this.materias=[];
    this.estudiantesMateria =[];
  }

  ngOnInit(): void {
    this.mensaje = null;
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();

    this.userService.getMaterias(this.autService.GetUserId())
    .then((items) => {
      items.forEach((item) => {
        const model:IdModel<Materia>={
          id: item.id,
          model: <Materia>item.data()
        };

        this.materias.push(model);
      })
    })
    .catch((err) => {
      console.log(err);
      this.mensaje = {
        txt:"Ocurrió un error al cargar las materias.",
        tipo:TipoMje.Danger
      };
    })
    .finally(()=>{
      this.spinner.hide();
    });
  }

  seleccionarMateria(materia:IdModel<Materia>){
    this.spinner.show();
    this.estudiantesMateria=[];
    this.mensaje = null;    
    this.materiaSeleccionada = materia;

    this.materiaService.getEstudiantes(materia.id)
    .then((items) => {
      items.forEach((item) => {
        const model:IdModel<User>={
          id: item.id,
          model: <User>item.data()
        };

        this.estudiantesMateria.push(model);
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
}
