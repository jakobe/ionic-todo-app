import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TodoItem } from '../../models/TodoItem';

@Component({
  selector: 'todo-list-item',
  templateUrl: 'todo-list-item.html'
})
export class TodoListItem  {

  @Input() todos: Observable<TodoItem[]>;
  @Input() title: string;
  @Input() iconName: string;
  @Input() iconColor: string;
  @Output() goto = new EventEmitter();

  constructor() {
  }

}
