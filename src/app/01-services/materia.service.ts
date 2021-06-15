import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Materia } from '../02-models/materia';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MateriaService extends BaseService<Materia> {

  constructor(private fire:AngularFirestore) { 
    super(fire);
    this.setCollection("materias");
  }
}
