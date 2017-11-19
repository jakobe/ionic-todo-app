import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { TodoItem } from '../../models/TodoItem';

@Component({
  selector: 'page-inbox',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        <ion-icon name='ios-filing' color='primary' item-start></ion-icon>
        Inbox
      </ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content>
    <ion-list *ngIf="adding" inset>
      <ion-item>
        <ion-input id="newTodo" [(ngModel)]="newItem.title" ion-input placeholder="What to do...?"></ion-input>
      </ion-item>
      <ion-item>
        <button round icon-only large item-right ion-button color='danger' (click)="adding = false;">
          <ion-icon name='close'></ion-icon>
        </button>
        <button round icon-only large item-right ion-button color='secondary' (click)="addItem()">
        <ion-icon name='checkmark'></ion-icon>
        </button>
      </ion-item>
    </ion-list>

    <ion-list reorder="true" (ionItemReorder)="reorderItems($event)">
      <ion-item-sliding *ngFor="let item of items">
        <ion-item icon-end>
          <ion-checkbox [(ngModel)]="item.isDone" (click)="save()" item-start></ion-checkbox>
          <ion-label>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }} <ion-icon small *ngIf="item.call" name="call" item-end></ion-icon></p>
          </ion-label>
        </ion-item>
        <ion-item-options side="left">
          <button ion-button color='danger' (click)="delete(item)">
            <ion-icon name='trash'></ion-icon>
            Delete
          </button>
        </ion-item-options>
        <ion-item-options side="right">
          <button ion-button color='bright'>
            <ion-icon name='star'></ion-icon>
            Today
          </button>
          <button small ion-button color='primary'>
            <ion-icon name='moon'></ion-icon>
            Tonight
          </button>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
    <button ion-button large round color='primary' icon-only (click)="adding = true; //document.getElementById('newTodo').focus();">
      <ion-icon name='add' icon-end></ion-icon>    
    </button>
  </ion-content>`
})
export class InboxPage {
  items:TodoItem[];
  adding : Boolean;
  newItem = {
    title: ""
  };
  save() : void {
    this.dataProvider.saveItems();
  };
  addItem() : void {
    this.items.push(new TodoItem(this.newItem.title, ""));
    this.save();
    this.adding = false;
    this.newItem = {
      title: ""
    };
  };
  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    this.save();    
  }
  delete(item : TodoItem) {
    var index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.save();    
    }
  };
  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
    this.items = dataProvider.items.inbox;
  }
}
