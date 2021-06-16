import { Component, Input, OnInit } from '@angular/core';
import { Materia } from 'src/app/02-models/materia';

@Component({
  selector: 'app-materia-item',
  templateUrl: './materia-item.component.html',
  styleUrls: ['./materia-item.component.css']
})
export class MateriaItemComponent implements OnInit {

  @Input() materia:Materia;

  constructor() { }

  ngOnInit(): void {
  }

}
