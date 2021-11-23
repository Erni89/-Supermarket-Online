import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    public _userService: UsersService,

  ) { }

  ngOnInit(): void {
    
  }
}


