import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/01-services/auth.service';
import { Rol } from 'src/app/02-models/enums/rol-enum';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user:User;
  navbarType:number;
  
  constructor(private authService:AuthService) {
    this.navbarType = 0;
  }

  ngOnInit(): void {
    if(this.user){
      switch(this.user.rol){
        case Rol.Admin:
          this.navbarType = 1;
          break;
        case Rol.Estudiante:
          this.navbarType = 2;
          break;
        case Rol.Profesor:
          this.navbarType = 3;
          break;
      }
    }
  }

  logout(){
    this.authService.Desloguearse();
  }

}
