import { Rol } from "./enums/rol-enum";
import { Materia } from "./materia";

export interface User{
    id?:string;
    email:string;
    perfilSrc:string;
    rol:Rol;
}