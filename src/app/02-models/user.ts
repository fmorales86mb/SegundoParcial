import { Rol } from "./enums/rol-enum";

export interface User{
    email:string;
    perfilSrc:string;
    rol:Rol;
}