import { Component } from '@angular/core';

import { PushNotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private notifications: PushNotificationsService) {
  }

  requestPermission() {
    this.notifications.requestPermission();
  }

  sendNotification() {
    this.notifications.create("Test").subscribe();
  }

}
