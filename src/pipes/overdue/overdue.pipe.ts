import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { TodoItem } from '../../models/TodoItem';

function _overdue(item:TodoItem) {
  return item.isDone === false && item.isOverdue;
};

@Pipe({
  name: 'overdue',
})
export class OverduePipe implements PipeTransform { 
  transform(value: Observable<TodoItem[]>) {
    return value.pipe(map(todos => todos.filter(_overdue)));
  }
}
