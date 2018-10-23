import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Broadcaster } from '@ionic-native/broadcaster';

import { AngularFireModule } from 'angularfire2';
import { firebase_config } from './app.firebase.config';
import { AngularFireAuth } from 'angularfire2/auth';
import {NgxMaskModule} from 'ngx-mask'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SalePage } from '../pages/sale/sale';
import { SaleInsertProductPage } from '../pages/sale-insert-product/sale-insert-product';
import { SaleFinishOrderPage } from '../pages/sale-finish-order/sale-finish-order';
import { OrdersPage } from '../pages/orders/orders';
import { AuthProvider } from '../providers/auth/auth';
import { CompanyProvider } from '../providers/company/company';
import { ProductProvider } from '../providers/product/product';
import { NotificationProvider } from '../providers/notification/notification';
import { OneSignal } from '@ionic-native/onesignal';
import { OrderProvider } from '../providers/order/order';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SalePage,
    SaleInsertProductPage,
    SaleFinishOrderPage,
    OrdersPage,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar'
    }),
    AngularFireModule.initializeApp(firebase_config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SalePage,
    SaleInsertProductPage,
    SaleFinishOrderPage,
    OrdersPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AngularFireAuth,
    CompanyProvider,
    ProductProvider,
    NotificationProvider,
    OrderProvider,
    Broadcaster
  ]
})
export class AppModule { }
