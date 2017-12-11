import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { TodoItem } from '../../models/TodoItem';

function _notdone(item:TodoItem) {
  return item.isDone === false;
};

 @Pipe({
  name: 'notDone',
})
export class NotDonePipe implements PipeTransform {  
  transform(value: Observable<TodoItem[]>) {
    return value.pipe(map(todos => todos.filter(_notdone)));
  }
}
