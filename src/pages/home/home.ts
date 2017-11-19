import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InboxPage } from '../inbox/inbox';
import { TodayPage } from '../today/today';
import { DataProvider } from '../../providers/data/data';

const itemFilter = {

  notdone(item) {
    return item.isDone === false;
  },
  
  overdue(item) {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());  
    return item.isDone === false && item.dueDate > today
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

  
export class HomePage {
  lists = {};
  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
    this.lists = {
      inbox: {
        get notdone() { return dataProvider.items.inbox.filter(itemFilter.notdone).length; },
        get overdue() { return dataProvider.items.inbox.filter(itemFilter.overdue).length; }
      },
      today: {
        get notdone() { return dataProvider.items.today.filter(itemFilter.notdone).length; },
        get overdue() { return dataProvider.items.today.filter(itemFilter.overdue).length; }
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
