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
import {HttpClientModule} from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages'
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
import { ModalComponent } from './recomponents/modal/modal.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MaterialFormComponent } from './components/material-form/material-form.component';
import {AppRoutesModule} from './app-routes.module';
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
    BsCardComponent,
    ModalComponent,
    CustomerFormComponent,
    VendorFormComponent,
    UserFormComponent,
    MaterialFormComponent,
    // NgbdModalConfirmAutofocus
  ],
  // entryComponents: [ NgbdModalConfirmAutofocus],
  imports: [
  BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
