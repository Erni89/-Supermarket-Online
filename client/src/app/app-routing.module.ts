import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { Error404Component } from './components/error404/error404.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { AdminLoginGuard } from './guards/admin-login.guard';
import { UnLoginGuard } from './guards/un-login.guard';
import { UserLoginGuard } from './guards/user-login.guard';



const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [UnLoginGuard]
  },
  {
    path: 'main',
    children:[
      {path:'',pathMatch:'full',component:MainComponent},
      { path: 'shop', component: ShoppingPageComponent },
      { path: 'order', component: OrderComponent },
      { path: "**", redirectTo: '', }
    ],
    canActivate: [UserLoginGuard]
  },

  {
    path: 'admin',
    children: [
      { path: "", pathMatch: "full", component: AdminComponent },
      { path: 'add', component: AddProductComponent },
      { path: "**", redirectTo: '', }
    ],
    canActivate: [AdminLoginGuard]
  },
  {
    path: '',
    pathMatch: "full", redirectTo: 'home'
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
