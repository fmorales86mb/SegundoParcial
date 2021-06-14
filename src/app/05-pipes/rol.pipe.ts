import { Pipe, PipeTransform } from '@angular/core';
import { Rol } from '../02-models/enums/rol-enum';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(value: Rol, ...args: unknown[]): unknown {
    let result:string;

    switch(value){
      case Rol.Admin:
        result = "Administrador";
        break;
      case Rol.Estudiante:
        result = "Estudiante";
        break;
      case Rol.Profesor:
        result = "Docente";
        break;
      default:
        result = "";
        break;
    }

    return result;
  }

}
