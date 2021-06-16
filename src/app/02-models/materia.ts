import { User } from "./user";

export interface Materia{
    name:string;
    cuatrimestre:number;
    cupo:number;
    year:number;
    docente:User;
    estudiantes:User[];
}