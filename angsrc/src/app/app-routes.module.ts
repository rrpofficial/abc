import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OrderComponent } from './components/order/order.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { PayableComponent } from './components/payable/payable.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RecievableComponent } from './components/recievable/recievable.component';
import { AccountdetailComponent } from './components/accountdetail/accountdetail.component';
import { MaterialFormComponent } from './components/material-form/material-form.component';
import { MaterialComponent } from './components/material/material.component';
import { ProductFormComponent } from './components/productform/productform.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerComponent } from './components/customer/customer.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './components/user/user.component';


const routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginFormComponent},
    { path : 'orders/new', component : OrderFormComponent, canActivate: [AuthGuard]},
    { path : 'orders/:id', component : OrderFormComponent, canActivate: [AuthGuard]},
    { path : 'orders', component : OrderComponent, canActivate: [AuthGuard]},
    { path : 'payables', component : PayableComponent, canActivate: [AuthGuard]},
    { path : 'recievables', component : RecievableComponent, canActivate: [AuthGuard]},
    { path : 'accountdetails', component : AccountdetailComponent, canActivate: [AuthGuard]},
    { path : 'materials/new', component : MaterialFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'materials/:id', component : MaterialFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'materials', component : MaterialComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'products/new', component : ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'products/:id', component : ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'products', component : ProductComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'customers/new', component : CustomerFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'customers/:id', component : CustomerFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'customers', component : CustomerComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'vendors/new', component : VendorFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'vendors/:id', component : VendorFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'vendors', component : VendorComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'users/new', component : UserFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'users/:id', component : UserFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path : 'users', component : UserComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    { path: '**', redirectTo: '' }
  ]
@NgModule({
imports : [
    RouterModule.forRoot(routes)
],
exports : [RouterModule]
})
export class AppRoutesModule{}