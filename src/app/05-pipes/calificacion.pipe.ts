import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calificacion'
})
export class CalificacionPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if(value >= 1 && value < 4){
      return "Desaprobado";
    }else if(value >= 4 && value <= 6){
      return "Aprobado";
    }else if(value > 6 && value <= 10){
      return "Promocionado";
    }
    else{
      return "-";
    }
  }

}
