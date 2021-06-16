import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { MateriaService } from 'src/app/01-services/materia.service';
import { UserService } from 'src/app/01-services/user.service';
import { Rol } from 'src/app/02-models/enums/rol-enum';
import { IdModel } from 'src/app/02-models/idModel';
import { Materia } from 'src/app/02-models/materia';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.css']
})
export class AltaMateriaComponent implements OnInit {

  user:User;
  users:IdModel<User>[];
  docenteSeleccionado:IdModel<User>;
  public form: FormGroup;
  docenteEmail:string;

  constructor(private autService:AuthService, 
    private userService:UserService,
    private spinner: NgxSpinnerService,
    private bf:FormBuilder,
    private materiaService: MateriaService, 
    private router:Router) { 
    this.users=[];
    this.docenteEmail = "";
  }

  ngOnInit(): void {
    this.spinner.show();

    this.initForm();
    this.user = this.autService.GetCurrentUser();
    
    this.userService.getItemByFilter("rol", Rol.Profesor)
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        let model:IdModel<User>={
          id:doc.id,
          model:doc.data()
        };
        this.users.push(model)        
        //console.log(doc.id, " => ", doc.data());        
      });            
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      this.spinner.hide();
    })
  }

  setDocente(docente:IdModel<User>){
    this.docenteSeleccionado = docente;
    this.docenteEmail = this.docenteSeleccionado.model.email;
  }

  async createMateria(){
    this.spinner.show();

    let materia:Materia = {
      docente: this.docenteSeleccionado.model,
      name: this.getName().value,
      cuatrimestre: this.getCuatri().value,
      cupo: this.getCupo().value,
      year: this.getYear().value,
      estudiantes: []
    };

    this.materiaService.addItem(materia)
    .then(async()=>{
      materia.docente = null;
      this.docenteSeleccionado.model.materias.push(materia);
      await this.userService.setItemWithId(this.docenteSeleccionado.model, this.docenteSeleccionado.id);
      this.router.navigate(["admin/home"]);
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      this.spinner.hide();
    })
  }

  initForm(){
    this.form = this.bf.group({
      nameCtrl:['', [Validators.required]],
      cuatriCtrl:['', [Validators.required]],
      cupoCtrl:['', [Validators.required, Validators.max(100), Validators.min(1), Validators.pattern("^[0-9]*$")]],
      yearCtrl:['', [Validators.required, Validators.max(2050), Validators.min(2000), Validators.pattern("^[0-9]*$")]],
      docCtrl:['',[Validators.required]]
    });
  }

  getName(){ return this.form.get('nameCtrl'); }
  getCuatri(){ return this.form.get('cuatriCtrl'); }
  getCupo(){ return this.form.get('cupoCtrl'); }
  getYear(){ return this.form.get('yearCtrl'); }
  getDoc(){ return this.form.get('docCtrl'); }
}
