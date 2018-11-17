import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Constants } from '../../app/constants';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private db;
  public user

  constructor(private afAuth: AngularFireAuth) {
    this.db = firestore();
    this.db.settings({ timestampsInSnapshots: true });
  }

  signIn(user) {
    return new Promise((response, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((document) => {
        this.getApartment(user.email).then((record) => {
          this.user = record
          response(record)
        }).catch((err) => {
          response(null)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getApartment(email) {
    return new Promise((response) => {
      this.db.collection(Constants.COLLECTION_APARTMENTS).where('email', '==', email).get().then((documents) => {
        if (documents.docs.length > 0) {
          let data = {
            uid: documents.docs[0].id,
            email: documents.docs[0].data().email,
            number: documents.docs[0].data().number,
            person: documents.docs[0].data().person,
          }
          response(data)
        } else {
          response(null)
        }
      })
    })
  }

  setPassword(password) {
    return new Promise((response, reject) => {
      var user = this.afAuth.auth.currentUser
      user.updatePassword(password).then(() => {
        response(true)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getApartmentById(id) {
    return new Promise((response) => {
      this.db.collection(Constants.COLLECTION_APARTMENTS).doc(id).get().then((documents) => {
        if (documents.exists) {
          response(documents.data())
        } else {
          response(null)
        }
      })
    })
  }

  setProfile(id, data) {
    return new Promise((response) => {
      this.db.collection(Constants.COLLECTION_APARTMENTS)
        .doc(id)
        .set(data)
        .then((resp) => {
          response(resp)
        })
    })
  }

  setDeviceApartment(email, deviceId) {
    this.db.collection(Constants.COLLECTION_APARTMENTS).where('email', '==', email).get().then((documents) => {
      if (documents.docs.length > 0) {

        if (!documents.docs[0].data().device) {
          let data = documents.docs[0].data()
          data['device'] = deviceId
          this.db.collection(Constants.COLLECTION_APARTMENTS).doc(documents.docs[0].id).set(data);
        }
      }
    });
  }

  forgotPassword(email) {
    return new Promise((response:any) => {
      this.afAuth.auth.sendPasswordResetEmail(email).then((resp) => {
        console.log(resp)
        response(resp)
      })
    })
  }

}
