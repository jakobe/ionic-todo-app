import { Component, Input, OnChanges,  SimpleChange, Output, EventEmitter, ViewChild } from '@angular/core';
import { ItemSliding } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators/first';
import { map } from 'rxjs/operators/map';

import { TodoProvider } from '../providers/todo/todo.provider';
import { TodoItem } from '../models/TodoItem';

@Component({
    selector: 'todo-list',
    templateUrl: 'todolist.html'
})
export class TodoList implements OnChanges {
    @Input() todos: Observable<TodoItem[]>;
    @Input() showIcons: boolean = true;
    @Input() showAddNew: boolean = false;
    @Input() newDefaults: TodoItem;
    @Output() onHideAddNew = new EventEmitter();
    @ViewChild('newTodoInput') newTodoInput;

    newItem = Object.assign(new TodoItem("", ""), this.newDefaults);

    get count() {
      return this.todos.pipe(map(todos => todos.length));
    }  
    
    get notdoneCount() {
      return this.todos.pipe(map(todos => todos.filter(item => item.isDone === false).length));
    }  

    get showReorder() {
      return this.count.pipe(map(count => count > 1));
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
      if (changes.showAddNew) {
        let input = this.newTodoInput;
        setTimeout(function() {input.setFocus();}, 1);
      }
      // for (let propName in changes) {
      //   let changedProp = changes[propName];
      //   let to = JSON.stringify(changedProp.currentValue);
      //   if (changedProp.isFirstChange()) {
      //     //Initial value of ${propName} set to ${to}
      //   } else {
      //     let from = JSON.stringify(changedProp.previousValue);
      //     //${propName} changed from ${from} to ${to}
      //   }
      // }
    }
      
    cancelAdd() {
      this.hideAddNew();
    }

    hideAddNew() {
      this.showAddNew = false;
      this.onHideAddNew.emit();
      this.newItem = Object.assign(new TodoItem("", ""), this.newDefaults);     
    }
      

    save() : void {
      this.todoProvider.save();
    };
    
    addItem() : void {
      this.todoProvider.create(this.newItem);
      this.hideAddNew();
    };
   
    reorderItems(indexes) {
      // console.log("indexes: %s", JSON.stringify(indexes));
      this.todos.pipe(first()).subscribe(todos => {
        let itemFrom = todos[indexes.from];
        let itemTo = todos[indexes.to];
        // console.log("itemFrom: %s", itemFrom.title);
        // console.log("itemTo: %s", itemTo.title);
        this.todoProvider.reorder(itemFrom, itemTo);
      });
    }
    
    delete(item : TodoItem) {
      this.todoProvider.delete(item);      
    };
    
    setDueToday(item : TodoItem, slidingItem: ItemSliding) {
      item.dueTonight = false;
      item.dueDate = TodoItem.today;
      slidingItem.close();
      this.save();
    };
  
    setDueTonight(item : TodoItem, slidingItem: ItemSliding) {
      item.dueTonight = true;
      item.dueDate = TodoItem.today;
      slidingItem.close();
      this.save();
    };
  
    constructor(private todoProvider: TodoProvider) {
    }
}