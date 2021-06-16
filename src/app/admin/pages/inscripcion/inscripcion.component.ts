import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { MateriaService } from 'src/app/01-services/materia.service';
import { UserService } from 'src/app/01-services/user.service';
import { Rol } from 'src/app/02-models/enums/rol-enum';
import { IdModel } from 'src/app/02-models/idModel';
import { Materia } from 'src/app/02-models/materia';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  user:User;
  users:IdModel<User>[];
  materias:IdModel<Materia>[];
  materiaSeleccionada:IdModel<Materia>;

  constructor(private autService:AuthService, 
      private userService:UserService,
      private spinner: NgxSpinnerService,
      private materiaService: MateriaService) { 
    this.users=[];
    this.materias=[];
  }

  ngOnInit(): void {
    this.spinner.show();
    this.user = this.autService.GetCurrentUser();
    
    this.userService.getItemByFilter("rol", Rol.Estudiante)
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        let model:IdModel<User> = {
          id:doc.id,
          model:doc.data()
        };
        this.users.push(model);        
        //console.log(doc.id, " => ", doc.data());        
      });            
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      this.spinner.hide();
    })

    this.materiaService.snapshots.subscribe((items) => {
      this.materias = items;
    })
  }

  seleccionarEstudiante(estudiante:IdModel<User>){
    if(this.materiaSeleccionada){
      if(!this.materiaSeleccionada.model.estudiantes.some((e) => {
        return e.email == estudiante.model.email;
      }) && 
      this.materiaSeleccionada.model.estudiantes.length < this.materiaSeleccionada.model.cupo){
        this.materiaSeleccionada.model.estudiantes.push(estudiante.model);
      }
    }
    else{
      console.log("No hay materia seleccionada");
    }
  }

  seleccionarMateria(materia:IdModel<Materia>){
    this.materiaSeleccionada = materia;
  }

  guardarClick(){
    this.spinner.show();
    this.materiaService.setItemWithId(this.materiaSeleccionada.model, this.materiaSeleccionada.id)
    .then(()=>{
      this.materiaSeleccionada = null;
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      this.spinner.hide();
    })
  }
}
