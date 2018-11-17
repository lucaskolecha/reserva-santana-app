import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular'
import { SaleInsertProductPage } from '../sale-insert-product/sale-insert-product'
import { ModalController } from 'ionic-angular'
import { OrderProvider } from '../../providers/order/order'
import { LoadingController } from 'ionic-angular'
import { AlertController } from 'ionic-angular'
/**
* Generated class for the SaleFinishOrderPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-sale-finish-order',
  templateUrl: 'sale-finish-order.html',
})
export class SaleFinishOrderPage {
  public sale: any
  public company: any
  public visualize: boolean
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private orderProvider: OrderProvider,
    private modalController: ModalController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private alertController: AlertController) {
    this.sale = this.navParams.get('sale')
    this.company = this.navParams.get('company')
    this.visualize = this.navParams.get('visualize')
    this.calculateTotal()
  }

  dismiss(stay) {
    this.viewCtrl.dismiss(stay)
  }

  removeProduct(i) {
    this.sale.orders.splice(i, 1)
    this.calculateTotal()
  }

  editProduct(i) {
    const item = this.sale.orders[i]
    const modalSelect = this.modalController.create(SaleInsertProductPage, { product: item.product, qtd: item.qtd })
    modalSelect.onDidDismiss(data => {
      if (data) {
        this.sale.orders[i] = data
        this.calculateTotal()
      }
    })
    modalSelect.present()
  }

  calculateTotal() {
    return (this.sale.orders || []).reduce((v, o) => o.total + v, 0);
  }

  finishOrder() {
    this.sale.totalOrder = this.calculateTotal()
    this.sale.date = new Date().getTime()
    let loader = this.loadingCtrl.create({
      content: `Enviando seu pedido para ${this.company.name}`
    })
    loader.present()
    this.orderProvider.lastRecord().then((response:Array<any>) => {
      if (response.length > 0) {
        response[0].cod ? this.sale.cod = response[0].cod + 1 : this.sale.cod = 1
      } else {
        this.sale.cod = 1
      }
      
      this.orderProvider.saveOrder(this.sale).then(() => {
        loader.dismiss(false)
        this.dismiss(false)
      })
    })
  }

  transformDate(date) {
    return new Date(date)
  }

}
