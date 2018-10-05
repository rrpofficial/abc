import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpModule } from '@angular/http';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { RecievableComponent } from './components/recievable/recievable.component';
import { MaterialComponent } from './components/material/material.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PayableComponent } from './components/payable/payable.component';
// import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth-guard.service';
import { UserComponent } from './components/user/user.component';
import { AccountdetailComponent } from './components/accountdetail/accountdetail.component';
import { ProductFormComponent } from './components/productform/productform.component';
import { BsCardComponent } from './recomponents/bs-card/bs-card.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginFormComponent,
    ProductComponent,
    OrderComponent,
    RecievableComponent,
    MaterialComponent,
    VendorComponent,
    CustomerComponent,
    PayableComponent,
    UserComponent,
    AccountdetailComponent,
    ProductFormComponent,
    BsCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginFormComponent},
      { path : 'orders', component : OrderComponent, canActivate: [AuthGuard]},
      { path : 'payables', component : PayableComponent, canActivate: [AuthGuard]},
      { path : 'recievables', component : RecievableComponent, canActivate: [AuthGuard]},
      { path : 'accountdetails', component : AccountdetailComponent, canActivate: [AuthGuard]},
      // // { path : 'materials/new', component : MaterialComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      // // { path : 'materials/:id', component : MaterialComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path : 'materials', component : MaterialComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path : 'products/new', component : ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path : 'products/:id', component : ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path : 'products', component : ProductComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      // // { path : 'customers/new', component : CustomerComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      // // { path : 'customers/:id', component : CustomerComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path : 'customers', component : CustomerComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      // // { path : 'vendors/new', component : VendorComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      // // { path : 'vendors/:id', component : VendorComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path : 'vendors', component : VendorComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      // // { path : 'users/new', component : UserComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      // // { path : 'users/:id', component : UserComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path : 'users', component : UserComponent, canActivate: [AuthGuard, AdminAuthGuard]}
    ]),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
