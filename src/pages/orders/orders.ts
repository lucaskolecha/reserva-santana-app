import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';
import { SaleFinishOrderPage } from '../sale-finish-order/sale-finish-order';
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

  public orders: any
  public unsnapshot

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public op: OrderProvider,
    public storage: Storage,
    public companyProvider: CompanyProvider,
    public modalController: ModalController,
    public loadingController: LoadingController) {
    let loader = this.loadingController.create({
      content: "Carregando Pedidos..."
    })
    loader.present()
    this.storage.get('apartment').then((ap) => {
      this.companyProvider.getAll().then((companies: Array<any>) => {
        this.unsnapshot = this.op.searchOrdersByAp(ap.uid, (resp) => {
          if (loader.id) {
            loader.dismiss()
          }
          this.orders = resp.map((item) => {
            item['companyInfo'] = companies.map((comp) => { return { name: comp.name, uid: comp.uid } }).filter((elem) => elem.uid === item.companyId)[0]
            return item
          })
        })
      })
    })
  }

  ngOnDestroy() {
    this.unsnapshot()
  }

  openVisualizeSale(order) {
    const modalFinish = this.modalController.create(SaleFinishOrderPage, { sale: order, visualize: true })
    modalFinish.onDidDismiss(() => { })
    modalFinish.present()
  }

  lastDateUpdate(order) {
    if (order.dateFinish) {
      return new Date(order.dateFinish).toLocaleString('pr-br')
    }
    if (order.dateSent) {
      return new Date(order.dateSent).toLocaleString('pr-br')
    }
    if (order.dateVisualized) {
      return new Date(order.dateVisualized).toLocaleString('pr-br')
    }
    return new Date(order.date).toLocaleString('pr-br')
  }

  displayStatus(status) {
    return this.op.translateStatus(status)
  }

}
