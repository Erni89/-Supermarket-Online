import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor(
    public _userService: UsersService,
    public _r: Router,
  ) { }

  ngOnInit(): void {
 
  }

  back(){
       if (!localStorage.token) {
        this._r.navigateByUrl('/home')
    }
    if (this._userService.user.role == 'user') { 
        this._r.navigateByUrl('/main')
    }
    if (this._userService.user.role == 'admin') {  
        this._r.navigateByUrl('/admin')
    }
  }
}
