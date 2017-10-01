import {Component, OnDestroy, OnInit} from '@angular/core';

import {PushNotificationsService} from 'angular2-notifications';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import {INotification} from "./notification.model";
import {WindowRef} from "./windowRef";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/do';

declare const Favico: any;

const favicon = new Favico({
  bgColor: '#5CB85C',
  textColor: '#ff0',
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  ws: $WebSocket;
  notifications: INotification[] = [];
  form: FormGroup;
  desktopNotificationsEnabled: boolean;
  badgeEnabled: boolean;

  constructor(private notificationService: PushNotificationsService,
              private winRef: WindowRef,
              private fb: FormBuilder) {

    this.form = fb.group({
      desktopNotificationsEnabled: ["", Validators.nullValidator],
      badgeEnabled: ["", Validators.nullValidator]
    });
  }

  ngOnInit() {

    // connect to websocket server
    this.ws = new $WebSocket("ws://127.0.0.1:3000");
    // subscribe to new notifications
    this.ws.getDataStream().subscribe(
      (msg) => {
        // add to the notification list
        this.notifications.push({created: new Date(), message: msg.data, seen: false});
        // update the favicon
        if (this.badgeEnabled) {
          favicon.badge(this.notifications.filter((n) => !n.seen).length);
        }
        // send a desktop notification
        if (this.desktopNotificationsEnabled) {
          this.notificationService.create(msg.data).subscribe();
        }
      },
      (msg) => {
        console.error("error", msg);
      },
      () => {
        console.info("complete");
      }
    );

    let clearStatus;

    // mark notifications as seen 5 seconds after focusing window
    this.winRef.nativeWindow.onfocus = () => {
      clearStatus = setTimeout(() => {
        this.notifications.forEach((notification) => {
          notification.seen = true;
        });
        favicon.badge(0);
      }, 5000);
    };

    // don't mark notifications as seen if the window loses focus again first
    this.winRef.nativeWindow.onblur = () => {
      clearTimeout(clearStatus);
    };

    this.form.controls.desktopNotificationsEnabled.valueChanges
      .subscribe(value => {
        if (value && this.notificationService.permission !== 'granted') {
          this.notificationService.requestPermission();
        }
        this.desktopNotificationsEnabled = value;
        localStorage.setItem('desktopNotificationsEnabled', value);
      });

    this.form.controls.badgeEnabled.valueChanges
      .subscribe(value => {
        this.badgeEnabled = value;
        localStorage.setItem('badgeEnabled', value);
        if (!value) {
          favicon.badge(0);
        } else {
          favicon.badge(this.notifications.filter((n) => !n.seen).length);
        }
      });

    // load settings from local storage
    this.form.controls.desktopNotificationsEnabled
      .setValue(localStorage.getItem('desktopNotificationsEnabled') === 'true' || false);
    this.form.controls.badgeEnabled
      .setValue(localStorage.getItem('badgeEnabled') === 'true' || false);
  }

  ngOnDestroy() {
    this.ws.close();
  }
}
