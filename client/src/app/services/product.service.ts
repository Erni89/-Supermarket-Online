import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import product from '../interfaces/product.interface'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public _http: HttpClient,
    public _r: Router,
    public _snackBar: MatSnackBar,

  ) { }


  // for get all categories 
  getCategories() {
    return this._http.get('http://localhost:1000/categories',{
      headers: {
        Authorization: localStorage.token
      }
    })
  }
  // for get all products 
  getProducts() {
    return this._http.get('http://localhost:1000/products',{
      headers: {
        Authorization: localStorage.token
      }
    })
  }
  // for get count products  for home page
  getCountPro() {
    return this._http.get('http://localhost:1000/products/countPro')
  }
// add new products to shop by admin
  addProduct(buddy: product) {
    return this._http.post('http://localhost:1000/products', buddy, {
     headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  // search product for user and admin
  SearchProduct(buddy: product) {
    return this._http.post('http://localhost:1000/products/search', buddy, {
     headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  // add img when add new product 2 options
  addImage(buddy) {
    return this._http.post('http://localhost:1000/img', buddy,{
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  addImageLink(url, filename) {
    return this._http.post('http://localhost:1000/img/link', { url, filename },{
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
// add new category to shop by admin
  addCategory(buddy: product) {
    return this._http.post('http://localhost:1000/categories', buddy, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  // edit product only admin
  editProduct(buddy){
    return this._http.put('http://localhost:1000/products', buddy, {
      headers: {
        'content-type': 'application/json',
        Authorization: localStorage.token
      }
    })
  }
  // for home page
  getCountOrder() {
    return this._http.get('http://localhost:1000/orders/countOrder')
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "", {
      duration: 3000,
    })
  }
}
