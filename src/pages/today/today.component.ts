import { Component } from '@angular/core';

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
    </ion-navbar>
  </ion-header>

  <ion-content>
    <todo-list [todos]="today" [showIcons]="false" [showAddButton]="false"></todo-list>
    <ion-item style="border-bottom: 1px dotted #ccc" padding-left padding-right><ion-icon name="moon" color="primary"></ion-icon>Tonight</ion-item>
    <todo-list [todos]="tonight" [showIcons]="false" [newDefaults]="newDefaults"></todo-list>
  </ion-content>`
})

export class TodayPage {
  newDefaults = new TodoItem("", "", false, TodoItem.today);
  constructor(private todoProvider: TodoProvider) {
  }

  get today() {
    return this.todoProvider.today.map(
      todos => todos.filter(
        todo => !todo.dueTonight
      )
    );
  }

  get tonight() {
    return this.todoProvider.today.map(
      todos => todos.filter(
        todo => todo.dueTonight
      )
    );
  }

  get todos() {
    return this.todoProvider.today.map(todos => todos.sort(
      (a,b) => {
        if(!a.dueTonight && b.dueTonight)
          return -1;
        if(a.dueTonight && !b.dueTonight)
          return 1;
        return 0;
      }
    ))
  }
}
