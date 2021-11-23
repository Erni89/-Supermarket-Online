import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


import isIsraeliIdValid from 'israeli-id-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _userService: UsersService,
    public _r: Router,


  ) { }
  public israelCity: any = []
  public hide: boolean = true;
  public hide2: boolean = true;
  
  public hidden='none'



  public myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      Validators.minLength(3)]],
      userId: ['', [Validators.required, Validators.pattern("^[0-9]*$"), ValidateIsraelId, Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
    })

    this._userService.getCity().subscribe(
      res => {
        this.israelCity = res
        // delete first cell 
        this.israelCity.shift()
        // ניקוי שדות ריקים
        this.israelCity = this.israelCity.filter(word => word.english_name.length > 0).map(word => (word.english_name))
        this.israelCity.sort()
      },
      err => console.log(err, "opps")
    )
  }

  public checkStep1(event, userId: any, email: any) {
    event.preventDefault()
    this._userService.getuser({ userId, email }).subscribe(
      (res: any) => {
        if (res.answer == null) {
          this._userService.step1 = !this._userService.step1
          this._userService.openSnackBar('next step')
        } else {
          this._userService.openSnackBar('ID or email address in the system')
        }

      }, (err) => {
        this._userService.openSnackBar('Error: ' + err)

      }
    )
  }

  public handle_submit() {
    this._userService.register(this.myForm.value).subscribe(
      (res: any) => {
        this.logToReg()
        this._userService.openSnackBar('register successfully')
      }, err => {
        console.log(err)
      }
    )
  }

  public logToReg() {
    this._userService.logReg = !this._userService.logReg
  }

}



function ValidateIsraelId(control: AbstractControl): { [key: string]: any } | null {

  if (control.value && control.value.length <6) {
    return { 'idIsToShort': true };
  } else if (control.value && control.value.length > 9) {
    return { 'idIsTooLong': true };
    //פונקציה מהספרייה שבודקת תקינות מספר ת.ז ישראלי
  } else if (control.value && !isIsraeliIdValid(control.value)) {
    return { 'idIsInValid': true };

  }
  return null;
}