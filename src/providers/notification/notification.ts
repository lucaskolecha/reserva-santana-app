import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { AuthProvider } from '../../providers/auth/auth';

@Injectable()
export class NotificationProvider {

  constructor(private oneSignal: OneSignal, private authProvider: AuthProvider) { }

  startNotification(email) {
    this.oneSignal.startInit('ba3888b5-8bf4-445c-be37-06f99e331ac4', '88684718732');
    this.oneSignal.setSubscription(true);
    this.oneSignal.registerForPushNotifications();
    this.oneSignal.getIds().then((ids) => {
      this.authProvider.setDeviceApartment(email, ids)
    }, (err) => {
      console.error(err);
    });
    this.oneSignal.endInit();
  }

  sendNotification(deviceID, title, message) {
    this.oneSignal.postNotification({
      include_player_ids: [deviceID],
      headings: {
        en: title,
      },
      contents: {
        en: message
      },
    }).then(() => { });
  }

}
