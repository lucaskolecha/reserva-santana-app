import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { User } from '../../interfaces/user.interface'
import { MenuController } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { ToastController } from 'ionic-angular'
import { NotificationProvider } from '../../providers/notification/notification'
import { AuthProvider } from '../../providers/auth/auth'
import { Broadcaster } from '@ionic-native/broadcaster'
import { Storage } from '@ionic/storage';
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

  constructor(private notification: NotificationProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private ap: AuthProvider,
    private menuController: MenuController,
    public broadcaster: Broadcaster,
    private storage: Storage) {
    this.menuController.swipeEnable(false);
  }

  invalidCredential() {
    let toast = this.toastCtrl.create({
      message: 'Email ou senha inválidos.',
      duration: 3000,
      position: 'bottom'
    })
    toast.onDidDismiss(() => true)
    toast.present()
  }

  async signIn() {
    let loader = this.loadingCtrl.create({
      content: "Buscando dados..."
    })
    loader.present()

    this.ap.signIn(this.user).then((teste) => {
      loader.dismiss()
      this.notification.startNotification(this.user.email)
      this.storage.set('apartment', teste).then(() => {
        this.broadcaster.fireNativeEvent('onLogin', {});
      })
    }).catch((err) => {
      loader.dismiss()
      if (err) {
        this.invalidCredential()
      }
    });

  }

}
