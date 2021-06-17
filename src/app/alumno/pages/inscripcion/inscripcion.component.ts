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
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

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
    this.estudiantesMateria=[];
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

  async inscribirseClick(){    
    if(!this.isEstudianteInscripto()){
      this.spinner.show();

      const model:IdModel<User> = {
        id:this.autService.GetUserId(),
        model:this.user
      };

      this.materiaService.setEstudiante(model, this.materiaSeleccionada.id)
      .then(()=>{
        this.userService.setMateriaToUser(model.id, this.materiaSeleccionada)
        this.mensaje = {
          txt: "Inscripción exitosa",
          tipo: TipoMje.Success
        };  
        this.seleccionarMateria(this.materiaSeleccionada);
      })
      .catch((err)=>{
        this.mensaje = {
          tipo:TipoMje.Danger,
          txt:"Ocurrió un error inesperado, vuelva a intentarlo más tarde."
        }
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

  isEstudianteInscripto():boolean{
    return this.estudiantesMateria.some((item) => { return item.id == this.autService.GetUserId(); })
  }
}
