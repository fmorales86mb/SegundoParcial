import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/01-services/auth.service';
import { UserService } from 'src/app/01-services/user.service';
import { Rol } from 'src/app/02-models/enums/rol-enum';
import { IdModel } from 'src/app/02-models/idModel';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  user:User;
  users:IdModel<User>[];

  constructor(private autService:AuthService, 
      private userService:UserService,
      private spinner: NgxSpinnerService) { 
    this.users=[];
  }

  ngOnInit(): void {
    this.user = this.autService.GetCurrentUser();
    this.quitarFiltro();
  }

  aplicarFiltro(rol:Rol){    
    this.spinner.show();    
    this.userService.getItemByFilter("rol", rol)
    .then((querySnapshot)=>{
      this.users = [];
      querySnapshot.forEach((doc) => {
        let model:IdModel<User>={
          id:doc.id,
          model:doc.data()
        };
        this.users.push(model);        
      });            
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      this.spinner.hide();
    });
  }

  quitarFiltro(){
    this.spinner.show();
    this.userService.snapshots.subscribe((items) => {
      this.users = items;
      this.spinner.hide();
    });
  }
}
