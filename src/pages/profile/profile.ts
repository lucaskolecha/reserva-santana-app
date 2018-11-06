import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { AuthProvider } from '../../providers/auth/auth'
import { Storage } from '@ionic/storage'
import { LoadingController } from 'ionic-angular'
import { ToastController } from 'ionic-angular'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public profile: any
  public password: string
  public rePassword: string
  private idAp: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public storage: Storage,
    public loadingController: LoadingController,
    private toastController: ToastController, ) {
    this.profile = {}
    let loader = this.loadingController.create({
      content: `Corregando informações`
    })
    loader.present()
    this.storage.get('apartment').then((ap) => {
      this.idAp = ap.uid
      this.authProvider.getApartmentById(ap.uid).then((response) => {
        loader.dismiss()
        this.profile = response
      })
    })
  }

  validadePass() {
    if (this.password !== this.rePassword) {
      this.toastAlert('Senha e Repetir senha estão diferentes.')
      this.clearPass()
      return true
    } else {
      return false
    }
  }

  toastAlert(message) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    })
    toast.onDidDismiss(() => true)
    toast.present()
  }

  updateRecord() {
    if (this.validadePass()) {
      return
    }
    this.profile.password = this.password
    this.authProvider.setPassword(this.password).then(() => {
      this.authProvider.setProfile(this.idAp, this.profile).then(() => {
        this.toastAlert('Senha alterada com sucesso.')
        this.clearPass()
      })
    }).catch((err) => {
      this.toastAlert('Senha deve conter mais que 6 caracteres')
      this.clearPass()
    })

  }

  clearPass() {
    this.password = ''
    this.rePassword = ''
  }

  ionViewDidLoad() {
  }

}
