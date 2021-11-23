import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    public _http: HttpClient,
    public _r: Router,
    public _snackBar: MatSnackBar,
    public _userService: UsersService,

  ) { }


  public cartUser: any = {}
  // for login component if have cart or not, and if cart open
  getUserCart() {
    return this._http.get(`http://localhost:1000/cart/allSpcUsercart/${this._userService.user._id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
  }
  // check open cart for get id cart open by user
  getCartOpen() {
    return this._http.get(`http://localhost:1000/cart/opencart/${this._userService.user._id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
  }
  // if all cart close, then get the last cart by user
  getLastCartClose() {
    return this._http.get(`http://localhost:1000/cart/lastcloseCart/${this._userService.user._id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
  }
// if cart open get the product of cart
  getItemOpenCart(idCart: any) {
    return this._http.get(`http://localhost:1000/cart/itemOpenCart/${idCart}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
  }
  // if new user/all cart close 
  addNewCart(user: any) {
    return this._http.post('http://localhost:1000/cart/creatcart', { user }, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  // for shipping 
  addNewItemToCart(body: any) {
    return this._http.post('http://localhost:1000/cart/addtocart', body, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
   // for shipping delete all cart , still will be open
  deleteCart(cartId: any) {
    return this._http.post('http://localhost:1000/cart/deleteactivecart', { cartId }, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  // for shipping delete item from cart
  deleteItem(cartId, _id) {
    return this._http.post('http://localhost:1000/cart/deleteactivecartOneItem', { cartId, _id }, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  // for update total price of cart 
  totalPriceCart(cartId, cartTotalPrice) {
    return this._http.put('http://localhost:1000/cart/sumTotal', { cartId, cartTotalPrice }, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
// for otder check delivery date
  getAvalDate(dateShip) {
    return this._http.post('http://localhost:1000/orders/shippingDate', { dateShip }, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })

  }

  order(body: any) {
    return this._http.post('http://localhost:1000/orders', body, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  closeCart(_id: any) {
    return this._http.post('http://localhost:1000/cart/closeCart', { _id }, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }






}
