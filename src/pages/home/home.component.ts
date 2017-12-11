import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InboxPage } from '../inbox/inbox.component';
import { TodayPage } from '../today/today.component';
import { TodoItem } from '../../models/TodoItem';
import { TodoProvider } from '../../providers/todo/todo.provider';
import { APP_CONFIG, AppConfig } from '../../app/config/app.config';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

  
export class HomePage {
  inbox : Observable<TodoItem[]>;
  today : Observable<TodoItem[]>;
  version:string;
  constructor(private navCtrl: NavController, public todoProvider: TodoProvider, @Inject(APP_CONFIG) config: AppConfig) {
    this.version = config.version;
    this.inbox = todoProvider.inbox;
    this.today = todoProvider.today;
  }

  reloadPage(refresher) {
    setTimeout(() => {
      location.reload(true);
    }, 750);
  }

  goToInbox() {
    this.navCtrl.push(InboxPage);
  }

  goToToday() {
    this.navCtrl.push(TodayPage);
  }

}
