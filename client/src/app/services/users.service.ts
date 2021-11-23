import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import register from '../interfaces/register.interface'
import { MatSnackBar } from '@angular/material/snack-bar';
import jwtdecode from 'jwt-decode'



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    public _http: HttpClient,
    public _r: Router,
    public _snackBar: MatSnackBar,
  ) { }

  
  public step1: boolean = true
  public logReg: boolean = true
  public user: any = {}
  public loggedUser: boolean = false



// for register new user
  register(buddy: register) {
    return this._http.post('http://localhost:1000/users/register', buddy, {
      headers: { 'content-type': 'application/json' }
    })
  }
  // for login user/admin
  login(buddy: any) {
    return this._http.post('http://localhost:1000/users/login', buddy, {
      headers: { 'content-type': 'application/json' }
    })
  }
  // for step 2 of register 
  getCity() {
    return this._http.get('https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json')
  }
  // for register validator
  getuser(buddy: any) {
    return this._http.post('http://localhost:1000/users/checkDetails', buddy, {
      headers: { 'content-type': 'application/json' }
    })
  }
  
  // after login 
  public decode(token) {
    const d: any = jwtdecode(token)
    if (d.exp > Date.now() / 1000) {
      this.loggedUser = true
      this.user = d
    } else {
      this._r.navigateByUrl('home')
    }
  }

// for log out
  logout(msg) {
    this.loggedUser = false
    localStorage.removeItem("token")
    this.user = {}
    this._r.navigateByUrl('home')
    if (msg.length > 0) this.openSnackBar(msg)

  }
  openSnackBar(msg: string) {
    this._snackBar.open(msg, "", {
      duration: 3000,
    })
  }
}
