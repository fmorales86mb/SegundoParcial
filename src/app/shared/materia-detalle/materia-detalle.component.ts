import { Component, Input, OnInit } from '@angular/core';
import { IdModel } from 'src/app/02-models/idModel';
import { Materia } from 'src/app/02-models/materia';

@Component({
  selector: 'app-materia-detalle',
  templateUrl: './materia-detalle.component.html',
  styleUrls: ['./materia-detalle.component.css']
})
export class MateriaDetalleComponent implements OnInit {

  @Input() item:IdModel<Materia>;

  constructor() { }

  ngOnInit(): void {
  }

}
