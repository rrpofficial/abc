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
      { path : 'materials', component : MaterialComponent, canActivate: [AuthGuard]},
      { path : 'products/new', component : ProductFormComponent, canActivate: [AuthGuard]},
      { path : 'products/:id', component : ProductFormComponent, canActivate: [AuthGuard]},
      { path : 'products', component : ProductComponent, canActivate: [AuthGuard]},
      { path : 'customers/new', component : CustomerComponent, canActivate: [AuthGuard]},
      { path : 'customers/:id', component : CustomerComponent, canActivate: [AuthGuard]},
      { path : 'customers', component : CustomerComponent, canActivate: [AuthGuard]},
      { path : 'vendors', component : VendorComponent, canActivate: [AuthGuard]},
      { path : 'users', component : UserComponent, canActivate: [AuthGuard]},
      { path : 'accountdetails', component : AccountdetailComponent, canActivate: [AuthGuard]},
    ]),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
