import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';
import { SalePage } from '../sale/sale';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public companies: any
  public compliment: any
  public user

  constructor(public navCtrl: NavController,
    private companyProvider: CompanyProvider,
    private loadingCtrl: LoadingController,
    private authProvider: AuthProvider) {
    let loader = this.loadingCtrl.create({
      content: "Carregando empresas..."
    })
    loader.present()
    this.companyProvider.getAll().then((response) => {
      this.user = this.authProvider.user
      this.companies = response
      loader.dismiss()
    })
    this.displayCompliment()
  }

  goSale(company) {
    this.navCtrl.push(SalePage, { company })
  }

  displayCompliment() {
    const hour = new Date().getHours();
    if (hour < 5) {
      this.compliment = 'Boa Noite'
    } else {
      if (hour < 8) {
        this.compliment = 'Bom Dia'
      } else {
        if (hour < 12) {
          this.compliment = 'Bom Dia'
        } else {
          if (hour < 18) {
            this.compliment = 'Boa Tarde'
          } else {
            this.compliment = 'Boa Noite'
          }
        }
      }
    }
  }

}
