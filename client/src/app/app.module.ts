import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//naterial
import { MatGridListModule } from '@angular/material/grid-list';
import { InfoComponent } from './components/info/info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { Error404Component } from './components/error404/error404.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import {MatCardModule} from '@angular/material/card';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { OrderComponent } from './components/order/order.component';

import {MatDatepickerModule} from '@angular/material/datepicker';


import { MatNativeDateModule } from '@angular/material/core';


















@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    RegisterComponent,
    HomepageComponent,
    InfoComponent,
    LoginComponent,
    MainComponent,
    AdminComponent,
    Error404Component,
    AddProductComponent,
    ShoppingPageComponent,
    OrderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    NgxMatFileInputModule,
    // NgbModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
