import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TodoItem } from '../../models/TodoItem';
import { TodoProvider } from '../../providers/todo/todo.provider';

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
    <todo-list [todos]="todos"></todo-list>
  </ion-content>`
})
export class TodayPage {
  todos: Observable<TodoItem[]>;  
  constructor(private todoProvider: TodoProvider) {
  }

  ngOnInit() {
    this.todos = this.todoProvider.today;
  }  
}
