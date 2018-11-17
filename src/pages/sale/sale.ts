import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SaleInsertProductPage } from '../sale-insert-product/sale-insert-product';
import { SaleFinishOrderPage } from '../sale-finish-order/sale-finish-order';
import { StatusOrder } from '../../interfaces/status-order.interface';
import { Storage } from '@ionic/storage';
import swal from 'sweetalert';

/**
 * Generated class for the SalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {

  public company: any
  public categoryAndProducts: any = []
  public sale: any

  constructor(public modalController: ModalController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider, public loadingCtrl: LoadingController) {
    this.company = this.navParams.get('company')
    let loader = this.loadingCtrl.create({
      content: "Carregando produtos..."
    })
    loader.present()
    this.productProvider.getProductsByCategories(this.company.uid).then((result) => {
      this.categoryAndProducts = result
      loader.dismiss()
    })

    this.storage.get('apartment').then((ap) => {
      this.sale = {
        apartmentId: ap.uid,
        companyId: this.company.uid,
        orders: [],
        status: StatusOrder.PENDING,
        reasonCancellation: '',
        description:'',
        date: 0,
        dateVisualized: 0,
        dateSent: 0,
        dateFinish: 0
      }
    })
  }

  openSelectProduct(product) {
    const modalSelect = this.modalController.create(SaleInsertProductPage, { product })
    modalSelect.onDidDismiss(data => {
      if (data) {
        this.sale.orders.push(data)
      }
    })
    modalSelect.present()
  }

  openFinishSale() {
    const modalFinish = this.modalController.create(SaleFinishOrderPage, { sale: Object.assign({}, this.sale), company: this.company, visualize: false })
    modalFinish.onDidDismiss((stay) => {
      if (!stay) {
        swal("Uhullll!", "Pedido realizado com sucesso, agora é só aguardar a resposta do estabelecimento.", "success");
        this.navCtrl.goToRoot({})
      }
    })
    modalFinish.present()
  }

}