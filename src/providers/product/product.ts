import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { Constants } from '../../app/constants';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  private db;

  constructor() {
    this.db = firestore();
    this.db.settings({ timestampsInSnapshots: true });
  }

  getCategories(uidCompany) {
    let all = [];
    return new Promise((response) => {
      this.db.collection(Constants.COLLECTION_COMPANIES)
        .doc(uidCompany)
        .collection(Constants.COLLECTION_PRODUCTS)
        .get()
        .then((documents) => {
          documents.forEach((doc) => {
            let item = {
              category: doc.data().category
            }
            all.push(item);
          });
          response(this.removeDuplicates(all, 'category'));
        });
    });
  }

  getProducts(uidCompany) {
    let all = [];
    return new Promise((response) => {
      this.db.collection(Constants.COLLECTION_COMPANIES)
        .doc(uidCompany)
        .collection(Constants.COLLECTION_PRODUCTS)
        .get()
        .then((documents) => {
          documents.forEach((doc) => {
            all.push(doc.data());
          });
          response(all);
        });
    });
  }

  getProductsByCategories(uidCompany) {
    return new Promise((response) => {
      this.getProducts(uidCompany).then((products: any) => {
        const arrayProducts = products;
        this.getCategories(uidCompany).then((resp: any) => {
          let arrayAll = [];
          resp.forEach(cat => {
            let separete = {
              category: cat.category,
              products: []
            };
            arrayProducts.forEach(prod => {
              if (prod.category === cat.category) {
                separete.products.push(prod)
              }
            });
            arrayAll.push(separete);
          });
          response(arrayAll);
        });
      });

    });
  }

  removeDuplicates(arr, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in arr) {
      lookupObject[arr[i][prop]] = arr[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;

  }

}
