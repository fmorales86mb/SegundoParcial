import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { MateriaService } from 'src/app/01-services/materia.service';
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
  mensaje:Mensaje;

  constructor(private autService:AuthService, 
      private spinner: NgxSpinnerService,
      private materiaService: MateriaService) {     
    this.materias=[];
  }

  ngOnInit(): void {
    this.mensaje = null;
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();
    
    this.materiaService.getMateriasByDocente(this.user.email)
    .then((items) => {
      items.forEach((item) => {
        const model:IdModel<Materia>={
          id: item.id,
          model: item.data()
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
    this.mensaje = null;
    this.materiaSeleccionada = materia;
  }
}
