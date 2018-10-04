import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public companies:any;

  constructor(public navCtrl: NavController, private companyProvider: CompanyProvider) {
    this.companyProvider.getAll().then((response) => {
      this.companies = response;
    });
  }

}
