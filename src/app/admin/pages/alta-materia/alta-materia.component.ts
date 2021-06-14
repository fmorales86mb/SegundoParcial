import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/01-services/auth.service';
import { UserService } from 'src/app/01-services/user.service';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.css']
})
export class AltaMateriaComponent implements OnInit {

  user:User;
  users:User[];

  constructor(private autService:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.autService.GetCurrentUser();
    
    this.userService.items.subscribe((items) =>{
      console.log(items);
      this.users = items;
    });
  }

}
