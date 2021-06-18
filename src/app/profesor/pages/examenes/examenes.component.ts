import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {

  user:User;
  materias:IdModel<Materia>[];
  materiaSeleccionada:IdModel<Materia>;
  estudiantesMateria:IdModel<User>[];
  estudiantesSeleccionados:IdModel<User>[];
  mensaje:Mensaje;
  examenCreado:IdModel<Examen>;
  cargarEstudiantes:boolean;

  public form: FormGroup;
  materiaName:string;  

  constructor(private autService:AuthService, 
      private spinner: NgxSpinnerService,
      private userService:UserService,
      private bf:FormBuilder,
      private examenService:ExamenService,
      private materiaService: MateriaService) {     
    this.materias=[];
    this.estudiantesMateria =[];
    this.estudiantesSeleccionados =[];
    this.materiaName = "";    
  }

  ngOnInit(): void {
    this.cargarEstudiantes = false;
    this.mensaje = null;
    this.initForm();
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
    this.estudiantesSeleccionados=[];
    this.mensaje = null;    
    this.materiaSeleccionada = materia;
    this.materiaName = materia.model.name;    

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



  initForm(){
    this.form = this.bf.group({
      materiaCtrl:['', [Validators.required]],
      fechaCtrl:['', [Validators.required]],      
      //notaCtrl:['', [Validators.required, Validators.max(10), Validators.min(1), Validators.pattern("^[0-9]*$")]],      
    });
  }

  getMateria(){return this.form.get('materiaCtrl');}
  getFecha(){ return this.form.get('fechaCtrl'); }  

  createExamen(){
    this.spinner.show();

    const examen:Examen = {
      docente:this.user,      
      materia:this.materiaSeleccionada.model,      
      fecha:this.getFecha().value
    };

    console.log(examen, this.estudiantesSeleccionados);    

    this.examenService.addItem(examen)
    .then(async (ref)=>{
      this.examenCreado = {
        id:ref.id,
        model:examen
      };

      await this.userService.setExamenToUser(this.autService.GetUserId(), this.examenCreado);

      this.spinner.hide();
      this.cargarEstudiantes = true;
    });

    // this.estudiantesSeleccionados.forEach((e)=>{
    //   this.examenService.setEstudiante(e, ref.id);
    // });
  }

  guardarNota(estudiante:IdModel<User>){
    this.spinner.show();
    this.examenService.setEstudiante(estudiante, this.examenCreado.id)
    .then(()=>{
      this.mensaje = {
        txt:"Nota guardada con éxito",
        tipo:TipoMje.Success
      };

      this.spinner.hide();
    })
  }

}
