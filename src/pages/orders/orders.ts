import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  public orders

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public op: OrderProvider,
    public storage: Storage) {
      this.storage.get('apartment').then((ap) => {
        this.op.searchOrdersByAp(ap).then((response) => {
          this.orders = response 
        })
      });
  }

  displayStatus(status) {
    return this.op.translateStatus(status)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
