import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import $ from 'jquery'
import 'jquery-mask-plugin'

/**
 * Generated class for the SaleInsertProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-insert-product',
  templateUrl: 'sale-insert-product.html',
})
export class SaleInsertProductPage {

  public product;
  public total: number = 0.00
  public qtd: number
  @ViewChild('qtdMask') qtdMask: ElementRef

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.product = this.navParams.get('product')
    this.qtd = this.navParams.get('qtd') || 0
    if (this.qtd > 0) {
      this.total = this.qtd * this.product.price
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.qtdMask) {
        $(this.qtdMask.nativeElement).mask('#0.000', { reverse: true })
      }
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addProduct() {
    this.total += this.product.price
    this.qtd += 1
  }

  removeProduct() {
    if (this.total != 0) {
      this.total -= this.product.price
      this.qtd -= 1
    }
  }

  calculateProduct() {
    this.total = this.product.price * (this.qtd / 1000)
    this.total = parseFloat(this.total.toFixed(2))
  }

  finish() {
    let data = {
      qtd: this.qtd,
      total: this.total,
      product: this.product
    };
    this.viewCtrl.dismiss(data);
  }

}
