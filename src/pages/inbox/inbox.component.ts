import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
    <todo-list [todos]="todos"></todo-list>
  </ion-content>`
})
export class InboxPage {   
  todos: Observable<TodoItem[]>;
  constructor(private todoProvider: TodoProvider) {
  }

  ngOnInit() {
    this.todos = this.todoProvider.inbox;
  }
  
  get count() {
    return this.todos.map(todos => todos.filter(item => item.isDone === false).length);
  }
}
