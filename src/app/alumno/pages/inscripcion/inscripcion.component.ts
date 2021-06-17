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
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

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
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();
  
    this.materiaService.snapshots.subscribe((items) => {
      this.materias = items;
      this.spinner.hide();
    })
  }

  seleccionarMateria(materia:IdModel<Materia>){
    this.mensaje = null;
    this.materiaSeleccionada = materia;
  }

  inscribirseClick(){
    if(!this.materiaSeleccionada.model.estudiantes.some((item)=>{
      return item.email == this.user.email;
    })){
      this.spinner.show();
      this.materiaSeleccionada.model.estudiantes.push(this.user);

      this.materiaService.setItemWithId(this.materiaSeleccionada.model, this.materiaSeleccionada.id)
      .then(()=>{
        this.mensaje = {
          txt: "Inscripción exitosa",
          tipo: TipoMje.Success
        };  
      })
      .catch((err)=>{
        this.mensaje = {
          txt: err,
          tipo: TipoMje.Danger
        };   
        console.log(err);
      })
      .finally(()=>{
        this.spinner.hide();
      });
    }else{
      this.mensaje = {
        txt: "Ya se encuentra inscripto en esta materia.",
        tipo: TipoMje.Info
      };  
    }
  }
}
