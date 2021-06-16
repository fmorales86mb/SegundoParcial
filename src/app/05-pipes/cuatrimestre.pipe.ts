import { Pipe, PipeTransform } from '@angular/core';
import { Materia } from '../02-models/materia';

@Pipe({
  name: 'cuatrimestre'
})
export class CuatrimestrePipe implements PipeTransform {

  transform(value: Materia, ...args: unknown[]): unknown {
    if (value.cuatrimestre == 1){
      return "1° Cuatrimestre " + value.year;
    }else{
      return "2° Cuatrimestre " + value.year;
    }
  }

}
