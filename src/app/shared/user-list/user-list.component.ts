import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() user:User;
  
  constructor() { }

  ngOnInit(): void {
  }

}
