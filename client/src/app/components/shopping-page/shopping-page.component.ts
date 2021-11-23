import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _productService: ProductService,
    public _cartService: CartService,
    public _r: Router,
    public _http: HttpClient,

  ) { }

  public products: any[] = []
  public categories: any[] = []

  public idCartOpen: string = ''



  public myFormSearch!: FormGroup
  public myFormAddItem!: FormGroup
  public showResult: boolean = false
  public newSearch: boolean = false
  public answerSearch: any[] = []
  public hidden: string = ''
  public hiddenPopup: string = ''
  public showPopup: string = 'none'
  public btnSide = 'hidden cart'


  public cartItem: any = []
  public addItemToCart: any = {}

  public tempName: string = ''
  public tempId: string = ''

  public totalPrice: number = 0



  ngOnInit(): void {
    this._productService.getCategories().subscribe(
      (res: any) => {
        this.categories = res.answer
      }, err => {
        this._productService.openSnackBar(err.message)
      }
    )
    this._productService.getProducts().subscribe(
      (res: any) => {
        this.products = res.answer
      }, err => {
        this._productService.openSnackBar(err.message)
      }
    )

    this._cartService.getCartOpen().subscribe(
      (res: any) => {
        this.idCartOpen = (res.answer[0]._id);
        if (this.idCartOpen.length > 0) {
          this._cartService.getItemOpenCart(this.idCartOpen).subscribe(
            (res: any) => {
              if (res.answer.length == 0) {
                this._productService.openSnackBar("Still don't have products")
              } else {
                let y = res.answer[0].products.map(sum => sum.totalPrice)
                this.totalPrice = y.reduce((a, b) => a + b, 0)
                this.tempId = res.answer[0]._id
                this._cartService.totalPriceCart(this.tempId, this.totalPrice).subscribe(
                  (res:any) => {
                  }, err => {
                    this._productService.openSnackBar(err.message)
                  }
                )
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
    this.myFormSearch = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    })
    this.myFormAddItem = this._fb.group({
      cart: ['', [Validators.required, Validators.minLength(2)]],
      product: ['', [Validators.required, Validators.minLength(2)]],
      amount: ['1', [Validators.required, Validators.min(1)]],
      price: [],
      totalPrice: ['', [Validators.required]],
    })
  }
  searchProduct(event) {
    event.preventDefault();
    if (this.myFormSearch.value.name.length >= 2) {
      this.showResult = !this.showResult
      this._productService.SearchProduct(this.myFormSearch.value).subscribe(
        (res: any) => {
          this.newSearch = !this.newSearch
          this.answerSearch = res.answer
        }, err => {
          this._productService.openSnackBar(err.message)
        }
      )
    } else {
      this._productService.openSnackBar("Enter min 2 tav  for search")
    }
  }

  fornewSearch() {
    this.myFormSearch.patchValue({
      name: ''
    })
    this.newSearch = !this.newSearch
    this.showResult = !this.showResult
  }

  SideNav() {
    if (this.hidden) {
      this.hidden = ''
      this.btnSide = 'hidden cart'
    } else {
      this.hidden = 'none'
      this.btnSide = 'show cart'
    }
  }



  public openPop(id, name, price) {

    this.tempName = name
    this.showPopup = ''

    this.hiddenPopup = 'none'

    this.myFormAddItem.patchValue({
      cart: this.idCartOpen,
      product: id,
      price: price

    })
  }
  public clodepop() {

    this.showPopup = 'none'

    this.hiddenPopup = ''

  }

  addItemTocart() {
    this.myFormAddItem.patchValue({
      totalPrice: this.myFormAddItem.controls.amount.value * this.myFormAddItem.controls.price.value
    })
    this._cartService.addNewItemToCart(this.myFormAddItem.value).subscribe(
      (res: any) => {
        this._productService.openSnackBar(res.msg);


        window.location.reload();

      }, err => {
        this._productService.openSnackBar(err.error.error);
      }
    )
  }

  deleteCarts() {
    console.log("deltet");
    this._cartService.deleteCart(this.tempId).subscribe(
      (res: any) => {
        this._productService.openSnackBar(res.msg);
        window.location.reload();
      }, err => {
        this._productService.openSnackBar(err.error.error);
      }

    )

  }
  deleteItem(event) {
    let _id = (event.target.id);
    this._cartService.deleteItem(this.tempId, _id).subscribe(
      (res: any) => {
        this._productService.openSnackBar(res.msg);
        window.location.reload();
      }, err => {
        this._productService.openSnackBar(err.error.error);
      }


    )

  }

  order() {
    this._cartService.totalPriceCart(this.tempId, this.totalPrice).subscribe(
      (res: any) => {
     
        this._productService.openSnackBar("Moved to order page");
        this._r.navigateByUrl('main/order')
      }, err => {
        this._productService.openSnackBar(err.error.error);
      }
    )
  }

}