import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  constructor(
    private _userService: UsersService,
    private _r: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
      
    if (this._userService.user.role == 'admin' && this._userService.loggedUser) {
      return true
    } 
    else {
      
      
      this._r.navigateByUrl('/home')
      return false
    }

  }

}
