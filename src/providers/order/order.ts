import { Injectable } from '@angular/core'
import { firestore } from 'firebase'
import { Constants } from '../../app/constants';

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

  saveOrder(order, company) {
    return new Promise((response, reject) => {
      this.db.collection(Constants.COLLECTION_COMPANIES).doc(company.uid)
        .collection(Constants.COLLECTION_ORDERS).doc().set(order).then((data) => {
          response(data);
        }).catch((error) => {
          reject(error)
        })
    })
  }

  searchOrdersByAp(apartment) {
    let allOrders = []
    return new Promise((response, reject) => {
      this.db.collection(Constants.COLLECTION_COMPANIES)
        .get()
        .then((companies) => {
          companies.docs.forEach((company, index) => {
            this.db.collection(Constants.COLLECTION_COMPANIES).doc(company.id)
              .collection(Constants.COLLECTION_ORDERS)
              .where('apartment.uid', '==', apartment.uid)
              .onSnapshot((orders) => {
                orders.forEach(element => {
                  let data = {}
                  data = element.data()
                  data['companyName'] = company.data().name
                  allOrders.push(data)

                  response(allOrders)

                })
              })
          })
        })
    })
  }

  translateStatus(status) {
    if (status === 'PENDING') {
      return 'Pendente'
    } else if (status === 'VISUALIZED') {
      return 'Visulizado'
    } else if (status === 'SENT') {
      return 'Enviado'
    } else {
      return 'Finalizado'
    }
  }

}
