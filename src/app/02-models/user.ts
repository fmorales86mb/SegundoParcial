import { Rol } from "./enums/rol-enum";
import { Materia } from "./materia";

export interface User{
    email:string;
    perfilSrc:string;
    rol:Rol;
    materias:Materia[];
}