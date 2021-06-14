import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/01-services/auth.service';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:User;

  constructor(private autService:AuthService) { }

  ngOnInit(): void {
    this.user = this.autService.GetCurrentUser();
  }
}
