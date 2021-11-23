import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(
    public _userService: UsersService,
    private _r: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.token) {
      this._userService.decode(localStorage.token)
    }
  }

}
