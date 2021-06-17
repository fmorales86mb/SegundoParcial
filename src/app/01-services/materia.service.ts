import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Materia } from '../02-models/materia';
import { BaseService } from './base.service';
import { IdModel } from '../02-models/idModel';

@Injectable({
  providedIn: 'root'
})
export class MateriaService extends BaseService<Materia> {

  constructor(private fire:AngularFirestore) { 
    super(fire);
    this.setCollection("materias");
  }    
  
  getMateriasByDocente(docenteEmail:string){
    return this.getItemByFilter("docente.email", docenteEmail);
  }

  // async getMateriasByEstudiante(estudianteEmail:string){
  //   let materias:IdModel<Materia>[];

  //   await this.snapshots.subscribe((items)=>{
  //     materias = items.filter((i) => {
  //       if(i.model.estudiantes.some((e) => {
  //         return e.email == estudianteEmail;
  //       })){
  //         return i;
  //       }
  //     })

  //     return materias;
  //   });

  //   return materias;
  // }
}
