import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Materia } from '../02-models/materia';
import { User } from '../02-models/user';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
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
}
