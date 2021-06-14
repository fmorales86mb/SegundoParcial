import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/02-models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user:User;
  
  constructor() { }

  ngOnInit(): void {
  }

}
