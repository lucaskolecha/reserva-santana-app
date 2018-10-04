import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async signIn() {
    console.log('ashdasdjkhasdhk');
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
      this.navCtrl.setRoot(HomePage);
    }).catch((err) => {
      console.log(err);
    });
  }

}
