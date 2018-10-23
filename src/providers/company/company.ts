import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { Constants } from '../../app/constants';

/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyProvider {

  private db;

  constructor() {
    this.db = firestore();
    this.db.settings({ timestampsInSnapshots: true });
  }

  getAll() {
    let all = [];
    return new Promise((response) => {
      this.db.collection(Constants.COLLECTION_COMPANIES).get().then((documents) => {
        documents.forEach(function (doc) {
          let item = {
            name: doc.data().name,
            phone: doc.data().phone,
            image: doc.data().image,
            uid: doc.id
          }
          all.push(item);
        });
        response(all);
      });
    });
  }
}
