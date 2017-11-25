import { Component, Inject } from '@angular/core';
import 'rxjs/add/operator/count';
import { NavController } from 'ionic-angular';
import { InboxPage } from '../inbox/inbox.component';
import { TodayPage } from '../today/today.component';
import { TodoItem } from '../../models/TodoItem';
import { TodoProvider } from '../../providers/todo/todo.provider';
import { APP_CONFIG, AppConfig } from '../../app/config/app.config';

function _notdone(item:TodoItem) {
  return item.isDone === false;
};

function _overdue(item:TodoItem) {
  return item.isDone === false && item.isOverdue;
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

  
export class HomePage {
  lists = {};
  version:string;
  constructor(private navCtrl: NavController, private todoProvider: TodoProvider, @Inject(APP_CONFIG) config: AppConfig) {
    this.version = config.version;
    this.lists = {
      inbox: {
        notdone: todoProvider.inbox.map(todos => todos.filter(_notdone).length),
        overdue: todoProvider.inbox.map(todos => todos.filter(_overdue).length)
      },
      today: {
        notdone: todoProvider.today.map(todos => todos.filter(_notdone).length),
        overdue: todoProvider.today.map(todos => todos.filter(_overdue).length)
      }
    };
  }

  goToInbox() {
    this.navCtrl.push(InboxPage);
  }

  goToToday() {
    this.navCtrl.push(TodayPage);
  }

}
