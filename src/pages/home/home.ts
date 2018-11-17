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

  formatPhone(phone) {
    var numbers = phone.replace(/\D/g, ''),
      char = { 0: '(', 2: ') ', 3: ' ', 7: '-' };
    phone = '';
    for (var i = 0; i < numbers.length; i++) {
      phone += (char[i] || '') + numbers[i];
    }
    return phone
  }

  disableCompany(item) {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const arrayTimeOpen = [] 
    const arrayTimeClose = []
    arrayTimeOpen.push(item.open.slice(0, -2))
    arrayTimeOpen.push(item.open.slice(2))
    arrayTimeClose.push(item.close.slice(0, -2))
    arrayTimeClose.push(item.close.slice(2))
    if (Number(hour) > Number(arrayTimeOpen[0]) && Number(hour) < Number(arrayTimeClose[0])) {
      return false
    }
    if (Number(hour) === Number(arrayTimeClose[0]) && Number(minute) < Number(arrayTimeClose[1])) {
      return false
    }
    if (Number(hour) === Number(arrayTimeOpen[0]) && Number(minute) > Number(arrayTimeOpen[1])) {
      return false
    }
    return true
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
