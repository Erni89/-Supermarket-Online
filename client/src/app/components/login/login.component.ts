import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _userService: UsersService,
    public _cartService: CartService,
    public _r: Router,
  ) { }

  public hide: boolean = true;
  public myForm!: FormGroup;
  public answerCart: {} = []
  
  public title:string=''


  ngOnInit(): void {
    this.myForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
    if (this._userService.loggedUser) {
      this._cartService.getUserCart().subscribe(
        (res: any) => {
          this.answerCart = res.answer
          this.title=' welcome to your first buying'
          if (this.answerCart) {
            this._cartService.cartUser = this.answerCart
            this._cartService.cartUser = this._cartService.cartUser.filter(open => open.completed == false)
          }else{
          this.title=''
          }
        }, err => {
          this._userService.openSnackBar(err);
        }
      )
    }
  }
  

  public handle_submitLogin() {
    this._userService.login(this.myForm.value).subscribe(
      (res: any) => {
        this._userService.openSnackBar('Login successfully')
        localStorage.token = res.token
        this._userService.loggedUser = true
        this._userService.decode(res.token)

        if (this._userService.user.role == "user") {
          this._r.navigateByUrl('/main')
        }
        if (this._userService.user.role == "admin") {
          this._r.navigateByUrl('/admin')
        }
      }, err => {
        this._userService.openSnackBar('Error: ' + err.error.error)
      }
    )
  }
  public logToReg() {
    this._userService.logReg = !this._userService.logReg
    this._userService.step1 = true
  }

  public addNewCartUser() {
    this._cartService.addNewCart(this._userService.user._id).subscribe(
      (res: any) => {
        this._userService.openSnackBar(res.msg);
        this._r.navigateByUrl('/main/shop')
      }, err => {
        this._userService.openSnackBar(err.error.error)
      }
    )
  }
}
