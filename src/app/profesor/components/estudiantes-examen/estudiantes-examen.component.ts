import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Examen } from 'src/app/02-models/examen';
import { IdModel } from 'src/app/02-models/idModel';
import { Mensaje } from 'src/app/02-models/mensaje';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-estudiantes-examen',
  templateUrl: './estudiantes-examen.component.html',
  styleUrls: ['./estudiantes-examen.component.css']
})
export class EstudiantesExamenComponent implements OnInit {

  @Input() estudiantesMateria:IdModel<User>[];
  estudiantesSeleccionados:IdModel<User>[];
  @Input() examen:IdModel<Examen>;
  mensaje:Mensaje;
  @Output() emitter = new EventEmitter<IdModel<User>>();

  constructor() { 
    this.estudiantesSeleccionados = [];
  }

  ngOnInit(): void {
  }

  seleccionarUsuario(estudiante:IdModel<User>){  
    if(!this.isEstudianteInList(estudiante)){
      this.estudiantesSeleccionados.push(estudiante);    
    }    
  }

  isEstudianteInList(estudiante:IdModel<User>):boolean{
    return this.estudiantesSeleccionados.some((item) => { return item.id == estudiante.id; })
  }

  guardarNota(estudiante:IdModel<User>){
    this.emitter.emit(estudiante);

    this.estudiantesSeleccionados = this.estudiantesSeleccionados.filter((e)=>{
      if(e.id != estudiante.id){
        return e;
      }
    });
  }

}
