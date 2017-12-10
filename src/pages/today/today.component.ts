import { Component } from '@angular/core';
import { map } from 'rxjs/operators/map';

import { TodoProvider } from '../../providers/todo/todo.provider';
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
      <ion-buttons end>
        <ion-note padding-right>{{count | async}}</ion-note>
    </ion-buttons>
    </ion-navbar>
  </ion-header>

  <ion-content>
    <ion-card class="alldone" *ngIf="(undone | async)?.length === 0">
      <ion-card-header color="whisper">
        <ion-icon name="checkmark"></ion-icon>
        <!-- or maybe paper plane? <ion-icon name="paper-plane"></ion-icon>--> 
        Just relax, nothing more to do today :)
      </ion-card-header>
      <ion-card-content color="whisper">
        <em>(Or get productive and add something to do...)</em>
      </ion-card-content>
    </ion-card>
    <todo-list [todos]="today" [showIcons]="false" [newDefaults]="newDefaults" [showAddNew]="isShowingAddNew" (onHideAddNew)="onHideAddNew($event)"></todo-list>
    <ion-item *ngIf="tonightCount | async" style="border-bottom: 1px dotted #ccc" padding-left padding-right><ion-icon name="moon" color="primary"></ion-icon>Tonight</ion-item>
    <todo-list *ngIf="tonightCount | async" [todos]="tonight" [showIcons]="false" [newDefaults]="newDefaults"></todo-list>
    <ion-fab right bottom>
      <button ion-fab large round color='bright' (click)="showAddNew()">
          <ion-icon name='add' icon-end></ion-icon>    
      </button>
    </ion-fab>
  </ion-content>`
})

export class TodayPage {
  newDefaults = new TodoItem("", "", false, TodoItem.today);
  isShowingAddNew = false;
  constructor(private todoProvider: TodoProvider) {
  }

  showAddNew() {
    this.isShowingAddNew = true;
  }

  onHideAddNew() {
    this.isShowingAddNew = false;
  }

  get todos() {
    return this.todoProvider.today;
  }
 
  get undone() {
    return this.todos.pipe(map(todos => todos.filter(item => item.isDone === false)));
  }

  get count() {
    return this.todos.pipe(map(todos => todos.filter(item => item.isDone === false).length));
  }

  get today() {
    return this.todos.pipe(map(todos => todos.filter(todo => !todo.dueTonight)));
  }

  get tonight() {
    return this.todos.pipe(map(todos => todos.filter(todo => todo.dueTonight)));
  }

  get tonightCount() {
    return this.tonight.pipe(map(todos => todos.length));
  }

}
