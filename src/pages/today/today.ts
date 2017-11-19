import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { TodoItem } from '../../models/TodoItem';

@Component({
  selector: 'page-today',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        <ion-icon name='star' color='bright'></ion-icon>
        Today
      </ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-item *ngFor="let item of items" icon-end>
        <ion-checkbox [(ngModel)]="item.isDone" item-start></ion-checkbox>
        <ion-label>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }} <ion-icon small *ngIf="item.call" name="call" item-end></ion-icon></p>
          <p *ngIf="item.dueDate"><em>{{item.dueDate | date:'d MMM yy'}}</em></p>        
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>`
})
export class TodayPage {
  items:TodoItem[];
  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
    this.items = dataProvider.items.today;
  }
}
