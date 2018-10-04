import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: User = { email: '', password: '' };

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public menuController: MenuController) {
    this.menuController.swipeEnable(false);

  }

  invalidCredential() {
    let toast = this.toastCtrl.create({
      message: 'Email ou senha inválidos.',
      duration: 3000,
      position: 'bottom'
    })

    toast.onDidDismiss(() => {
    })

    toast.present()
  }

  async signIn() {
    let loader = this.loadingCtrl.create({
      content: "Buscando dados..."
    })
    loader.present()
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
      loader.dismiss()
      this.navCtrl.setRoot(HomePage)
    }).catch((err) => {
      loader.dismiss()
      console.log(err)
      if (err) {
        this.invalidCredential()
      }
    });
  }

}
