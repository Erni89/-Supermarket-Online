import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _r: Router,
    public _productService: ProductService,
    private http: HttpClient
  ) { }

  public myForm!: FormGroup
  public myFormCategory!: FormGroup
  public categories: any[] = []
  public images: any
  public addCate: boolean = false

  ngOnInit(): void {
    // for add new product
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      url: [''],
    })
    // for add new category
    this.myFormCategory = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    })
    // get all categories from server
    this._productService.getCategories().subscribe(
      (res: any) => {
        this.categories = res.answer
      }, err => {
        this._productService.openSnackBar(err.error.error)
      }
    )
  }
  // for add new category
   addCategoties() {
    this._productService.addCategory(this.myFormCategory.value).subscribe(
      (res: any) => {
        this._productService.openSnackBar('Category Added successfully')
        window.location.reload();
      }, err => {
        console.log(err);
        this._productService.openSnackBar(err.error.error)
      }
    )
  }
  // for choice local image 
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  // add  new product to server
  // A local image will be copied to the server to the image folder
  // Link - The image will be downloaded on the server to the image folder
  public handle_submit(event) {
    let temp =this.myForm.value.name
    if (temp.includes('%')) {
        temp = temp.replace('%', '@')
    }
    // check values 
    if (this.myForm.value.name.length > 0 && this.myForm.value.category.length > 0
      && this.myForm.value.price > 0) {
      if (!this.images && this.myForm.value.url.length <= 0) {
        this._productService.openSnackBar("img missing")
      }
      // for local image
      if (this.images) {
        const formData = new FormData();
        formData.append('file', this.images, temp + '.png');
        this._productService.addImage(formData).subscribe(
          (res) => {
            // if upload image successfully then add product
            // clg for test 
            console.log("upload successfully")
            // add new product...
            // even if upload new product failed, image upload to server
            //  it can be o.k because the image Will be replaced when next add product
            this._productService.addProduct(this.myForm.value).subscribe(
              (res: any) => {
                this._productService.openSnackBar(' product Added successfully')
                this._r.navigateByUrl('/admin')
              }, err => {
                this._productService.openSnackBar(err.error.error)
              }
            )
          },
          (err) => {
            this._productService.openSnackBar(err.error.error)
          }
        )
      }
      // for utl image
      else {
        if (this.myForm.value.url.length > 0) {
          this._productService.addImageLink(this.myForm.value.url, temp + '.png').subscribe(
            (res: any) => {
              // if no error then add new product
              if (!res.error) {
                this._productService.addProduct(this.myForm.value).subscribe(
                  (res: any) => {
                    this._productService.openSnackBar(' product Added successfully')
                    this._r.navigateByUrl('/admin')
                  }, err => {
                    this._productService.openSnackBar(err.error.error)
                    
                  }
                )
              } else {
                this._productService.openSnackBar("link error add new link");
              }
            }, err => {
              this._productService.openSnackBar(err.error.error)
            }
          )
        }
      }
    }
    // if some data missing on form
    else {
      this._productService.openSnackBar("missing info");
    }
  }
}
