import { Injectable } from '@angular/core'
import { firestore } from 'firebase'
import { Constants } from '../../app/constants';
import { StatusOrder } from '../../interfaces/status-order.interface';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  private db

  constructor() {
    this.db = firestore()
    this.db.settings({ timestampsInSnapshots: true })
  }

  saveOrder(order) {
    return new Promise((response, reject) => {
      this.db.collection(Constants.COLLECTION_ORDERS)
        .add(order)
        .then((data) => {
          response(data)
        }).catch((err) => {
          reject(err)
        })
    })
  }

  searchOrdersByAp(apartmentId, response) {
    return this.db.collection(Constants.COLLECTION_ORDERS)
      .where('apartmentId', '==', apartmentId)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        response(snapshot.docs.map((doc) => Object.assign({ id: doc.id }, doc.data())))
      })
  }

  lastRecord() {
    return new Promise((response) => {
      this.db.collection(Constants.COLLECTION_ORDERS)
        .orderBy("date", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          response(snapshot.docs.map((doc) => Object.assign({ id: doc.id }, doc.data())))
        })
    })
  }

  translateStatus(status) {
    if (status === StatusOrder.PENDING) {
      return 'Pendente'
    } else if (status === StatusOrder.VISUALIZED) {
      return 'Visulizado'
    } else if (status === StatusOrder.SENT) {
      return 'Enviado'
    } else if (status === StatusOrder.CANCELED) {
      return 'Cancelado'
    } else {
      return 'Finalizado'
    }
  }

}
