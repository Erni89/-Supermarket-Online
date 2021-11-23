import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _productService: ProductService,
    public _r: Router,
    public _http: HttpClient,
  ) { }

  public products: any[] = []
  public editPro: any = {}

  // for side nav
  myWidth: string = '0px'
  myMargin: string = '0px'
  myWidthSide: string = '0px'
  myMarginSide: string = '0px'

  
  public myForm!: FormGroup
  public myFormSearch!: FormGroup
  public categories: any[] = []
  public selected: string = ''
  public selectedImg: string = ''
  public images: any
  public showResult: boolean = false
  public newSearch: boolean = false
  public answerSearch: any[] = []


  ngOnInit(): void {
    this.myForm = this._fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      url: [''],
    })
    this.myFormSearch = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    })

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

  openNav(event) {
    console.log(event.target.id);
    this.editPro = this.products.filter(item => item._id == event.target.id)
    this.myWidthSide = "30%";
    this.myWidth = "20%";
    this.myMargin = "30%";

    // for edit item
    this.myForm.patchValue({
      name: this.editPro[0].name,
      category: this.editPro[0].category._id,
      price: this.editPro[0].price,
      id: event.target.id,
    });
    this.selected = this.editPro[0].category.name
    this.selectedImg = this.editPro[0].img


  }
  closeNav() {
    this.myWidthSide = "0"
    this.myMargin = "0";
    this.editPro = {}
    this.selected = ''

  }
  // for choice local image 
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  handle_submit() {
    // for name that include %
    let temp = this.myForm.value.name
    if (temp.includes('%')) {
      temp = temp.replace('%', '@')
    }
    if (this.images || this.myForm.value.url.length > 0) {
      if (this.images) {
        const formData = new FormData();
        formData.append('file', this.images, temp + '.png');
        this._productService.addImage(formData).subscribe(
          res => {
            this._productService.openSnackBar("change img successfully"+ res)

          }, err => {
            this._productService.openSnackBar(err)
     
          }
        )
      }
      if (this.myForm.value.url.length > 0) {
        this._productService.addImageLink(this.myForm.value.url, temp + '.png').subscribe(
          (res: any) => {
            if (!res.error) {
              this._productService.openSnackBar("change img successfully"+ res)
            } else {
              this._productService.openSnackBar("link error add new link");
            }
          }
        )
      }
    }
    this._productService.editProduct(this.myForm.value).subscribe(
      (res: any) => {
        this._productService.openSnackBar(res.msg)
        window.location.reload()
      }, err => {
        this._productService.openSnackBar(err)
      }
    )
  }

  fornewSearch() {
    this.myFormSearch.patchValue({
      name:''
    })
    this.newSearch = !this.newSearch
    this.showResult = !this.showResult
  }

}
