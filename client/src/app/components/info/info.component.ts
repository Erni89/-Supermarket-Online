import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(
    public _userService: UsersService,
    public _productService: ProductService,
    public _cartService: CartService,

  ) { }

  public countProducts: number = 0
  public countOrders: number = 0

  public cartTotalPrice: number = 0
  public cartCreated: string = ''
  public lastcloseCart: string = ''

  public noCart: boolean = true
  public openCart: boolean = true




  ngOnInit(): void {
    if (this._userService.loggedUser) (
      this._cartService.getUserCart().subscribe(
        (res: any) => {
          // if array>0 then have cart open/close
          if (res.answer.length > 0) {
            this.noCart = false
            // get open cart if have
            this._cartService.getCartOpen().subscribe(
              (res: any) => {
                if (res.answer.length == 0) {
                  this.openCart = false
                  this._cartService.getLastCartClose().subscribe(
                    (res: any) => {
                      this.lastcloseCart = res.answer.created
                    }, err => {
                      this._productService.openSnackBar(err.message)
                    }
                  )
                } else {
                  this.openCart = true
                  this.cartCreated = res.answer[0].created
                  this._cartService.getItemOpenCart(res.answer[0]._id).subscribe(
                    (res: any) => {

                      if (res.answer.length == 0) {
                        this.cartTotalPrice = 0
                      } else {
                        this.cartTotalPrice = res.answer[0].cartTotalPrice
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
          } else {
            this._productService.openSnackBar('No cart')
          }
        }, err => {
          this._productService.openSnackBar(err.message)
        }
      )
    )

    this._productService.getCountPro().subscribe(
      (res: any) => {
        this.countProducts = res.count
      }, err => {
        this._productService.openSnackBar(err.message)
      }
    )
    this._productService.getCountOrder().subscribe(
      (res: any) => {
        this.countOrders = res.answer
      }, err => {
        this._productService.openSnackBar(err.message)
      }
    )
  }
}
