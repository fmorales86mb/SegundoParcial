import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
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
  mensaje:Mensaje;

  constructor(private autService:AuthService, 
      private spinner: NgxSpinnerService,      
      private userService:UserService) {     
    this.materias=[];
  }

  ngOnInit(): void {
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();

    this.userService.getMaterias(this.autService.GetUserId())
    .then((items) => {
      items.forEach((item)=>{
        const model:IdModel<Materia>={
          id:item.id,
          model:<Materia>item.data()
        };

        this.materias.push(model);
      })
    })
    .catch((err) => {
      this.mensaje = {
        tipo:TipoMje.Danger,
        txt:"Ocurrió un error inesperado, vuelva a intentarlo más tarde."
      }
      console.log(err);      
    })
    .finally(() => {
      this.spinner.hide();
    });
  }
}
