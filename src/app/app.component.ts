import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Broadcaster } from '@ionic-native/broadcaster';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { OrdersPage } from '../pages/orders/orders';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  public user

  constructor(public storage: Storage,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AngularFireAuth,
    private menuController: MenuController,
    public broadcaster: Broadcaster,
    private authProvider: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.autenticateUser()
    this.broadcaster.addEventListener('onLogin').subscribe((event) => {
      this.getStorageAp()
    });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  autenticateUser() {
    this.auth.authState
      .subscribe(
        user => {
          if (user) {
            this.authProvider.getApartment(user.email).then((data) => {
              this.rootPage = HomePage;
              this.menuController.swipeEnable(true);
              this.user = data;
            })
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  }

  getStorageAp() {
    this.storage.get('apartment').then((response) => {
      this.user = response
    })
  }

  goOrders() {
    this.nav.push(OrdersPage)
    this.menuController.close()
  }

  logout() {
    this.auth.auth.signOut().then(() => {
      this.storage.clear()
      this.user = {}
      this.menuController.close();
      this.rootPage = LoginPage;
    })
  }
}

