import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _productService: ProductService,
    public _cartService: CartService,
    public _userService: UsersService,
    public _r: Router,
    public _http: HttpClient,
  ) { }

  public cartItem: any = []
  public tempId: string = ''
  public idCartOpen: string = ''
  public cartTotalPrice: number = 0

  public searchRes: any = []

  public minDate = new Date();


  public myFormOrder!: FormGroup

  public israelCity: any = []

  public afterOrder: boolean = false


  ngOnInit(): void {
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


    this._cartService.getCartOpen().subscribe(
      (res: any) => {
        if (res.answer.length == 0) {
          this._r.navigateByUrl('home')
        }
        this.idCartOpen = (res.answer[0]._id);
        if (this.idCartOpen.length > 0) {
          this._cartService.getItemOpenCart(this.idCartOpen).subscribe(
            (res: any) => {

              if (res.answer.length == 0) {
                this._productService.openSnackBar("No products")
              } else {
                let y = res.answer[0].products.map(sum => sum.totalPrice)
                this.cartTotalPrice = y.reduce((a, b) => a + b, 0)
                this.tempId = res.answer[0]._id

                this._cartService.totalPriceCart(this.tempId, this.cartTotalPrice).subscribe(
                  res => {
                    // console.log(res);
                  }, err => {
                    this._productService.openSnackBar(err.message)
                  }
                )
                this.tempId = res.answer[0]._id
                this.cartTotalPrice = res.answer[0].cartTotalPrice
                this.cartItem = res.answer[0].products
              }
            }, err => {
              this._productService.openSnackBar(err.message)
            }
          )
        }
      }, err => {
        this._productService.openSnackBar(err.message)
      }
    )
    this.myFormOrder = this._fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      shippingDate: ['', [Validators.required, Validators.minLength(2)]],
      visa4Digits: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(4), Validators.maxLength(16)]],


    })


  }
  forcity() {
    this.myFormOrder.patchValue({
      city: this._userService.user.city
    })
  }
  forStreet() {
    this.myFormOrder.patchValue({
      street: this._userService.user.street
    })
  }

  checkshippingDate(event) {


    this._cartService.getAvalDate(event.target.value).subscribe(
      (res: any) => {
        if (res.answer >= 3) {
          this.myFormOrder.patchValue({
            shippingDate: ''
          })
          this._productService.openSnackBar("More 3 deliver for this day chose another day")
        }
      }, err => {
        console.log(err);
        this._productService.openSnackBar(err.error.error)
      }
    )

  }
  orderTodb() {
    this._cartService.order({ totalPrice: this.cartTotalPrice, orderDeatels: this.myFormOrder.value, user: this._userService.user._id, cart: this.idCartOpen }).subscribe(
      (res: any) => {

        if (res.err == false) {
          this.afterOrder = !this.afterOrder
          this._cartService.closeCart(this.idCartOpen).subscribe(
            (res: any) => {
              this._productService.openSnackBar("order complited...." + res.msg)
            }, err => {
              this._productService.openSnackBar(err.error.error)
            }
          )

        }
      }, err => {
        this._productService.openSnackBar(err.error.error)
      }
    )

  }
  mark(event) {
    if (event.target.value != '') {
      this.searchRes = this.cartItem.map(n => (n.product.name)).filter(x => x.includes(event.target.value))
      if (this.searchRes.length == 0) {
        this._productService.openSnackBar("not found")
      }
    } else {
      this.searchRes = []
    }
  }

  downrece() {
    let content = "";
    for (let i = 0; i < this.cartItem.length; i++) {
      content += (this.cartItem[i].product.name) + ':' + this.cartItem[i].totalPrice;
      content += "\n";
    }
    content += '\n' + 'Total price:' + this.cartTotalPrice + '\n'

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let text = content,
      blob = new Blob([text], { type: 'text/plain' }),
      anchor = document.createElement('a');
    anchor.download = this._userService.user.firstName + '-' + today.toLocaleDateString() + '.txt';
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
  }



  end() {
    this._r.navigateByUrl('/home')
    this._productService.openSnackBar("We hope to see you soon")

  }
}


// // for create cc validator
// function validCc(control: AbstractControl) {
//   console.log(control.value);
// }
