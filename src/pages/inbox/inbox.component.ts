import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { TodoItem } from '../../models/TodoItem';
import { TodoProvider } from '../../providers/todo/todo.provider';

@Component({
  selector: 'page-inbox',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title item-end>
        <ion-icon name='ios-filing' color='primary' item-start></ion-icon>
        Inbox
      </ion-title>
      <ion-buttons end>
        <ion-note padding-right>{{count | async}}</ion-note>
      </ion-buttons>
    </ion-navbar>
  </ion-header>

  <ion-content>
    <todo-list [todos]="todos" [showAddNew]="isShowingAddNew" (onHideAddNew)="onHideAddNew($event)"></todo-list>
    <ion-fab right bottom>
      <button ion-fab large round color='primary' (click)="showAddNew()">
          <ion-icon name='add' icon-end></ion-icon>    
      </button>
    </ion-fab>
  </ion-content>`
})
export class InboxPage {   
  todos: Observable<TodoItem[]>;
  isShowingAddNew = false; 
  constructor(private todoProvider: TodoProvider) {
    this.todos = this.todoProvider.inbox;
  }
  
  showAddNew() {
    this.isShowingAddNew = true;
  }

  onHideAddNew() {
    this.isShowingAddNew = false;
  }

  get count() {
    return this.todos.pipe(map(todos => todos.filter(item => item.isDone === false).length));
  }
}
