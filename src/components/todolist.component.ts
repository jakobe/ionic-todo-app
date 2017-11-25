import { Component, Input } from '@angular/core';
import { ItemSliding } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { TodoProvider } from '../providers/todo/todo.provider';
import { TodoItem } from '../models/TodoItem';

@Component({
    selector: 'todo-list',
    templateUrl: 'todolist.html'
})
export class TodoList {
    @Input() todos: Observable<TodoItem[]>;
    @Input() showIcons: boolean = true;
    @Input() showAddButton: boolean = true;
    @Input() newDefaults: TodoItem;

    adding : Boolean;
    newItem = Object.assign(new TodoItem("", ""), this.newDefaults);

    get count() {
      return this.todos.map(todos => todos.length);
    }  
    
    get notdoneCount() {
      return this.todos.map(todos => todos.filter(item => item.isDone === false).length);
    }  

    get showReorder() {
      return this.count.map(count => count > 1);
    }  

    save() : void {
      this.todoProvider.save();
    };
    
    addItem() : void {
      this.todoProvider.create(this.newItem);
      this.adding = false;
    };
    
    reorderItems(indexes) {
      // console.log("indexes: %s", JSON.stringify(indexes));
      this.todos.first().subscribe(todos => {
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
    showAddNew(input) {
      this.newItem = Object.assign(new TodoItem("", ""), this.newDefaults);
      this.adding = true;
      setTimeout(function() {input.setFocus();}, 1);
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