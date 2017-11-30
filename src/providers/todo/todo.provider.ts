import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { TodoItem } from '../../models/TodoItem';

const STORAGE_KEY = 'todoItems';

function _todoItemFromData(data) {
  return new TodoItem(data.title, data.description, data.isDone, data.dueDate ? new Date(data.dueDate) : null, data.dueTonight, data.call);
}
/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private _todos: BehaviorSubject<TodoItem[]>;
  private dataStore: {
    todos: TodoItem[]
  };
  constructor(private storage: Storage) {
    this._todos = <BehaviorSubject<TodoItem[]>>new BehaviorSubject(undefined);
    this.dataStore =  {
      todos: []
    }
    this._todos.next(Object.assign({}, this.dataStore).todos);
    this.loadInitialData();
  }

 loadInitialData() {
    this.loadFromStorage().then(result => {
      if(result) {
        if (Array.isArray(result)) {
          this.dataStore.todos = result.map(_todoItemFromData);          
        } else if (Array.isArray(result.inbox) && Array.isArray(result.today)) {
          //Convert from legacy schema:
          this.dataStore.todos = result.inbox.concat(result.today).map(_todoItemFromData);          
          this.saveToStorage();
        }
      } else {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() -1);
        this.dataStore.todos = [
          new TodoItem ('Arrange music for party', 'DJ Trump', false, yesterday, true, true),
          new TodoItem ('Buy cake for mom', 'The Blueberry one she loves so much'),
          new TodoItem ('Try on new shoes', 'Those fancy ones from Adidas', false, TodoItem.today),
          new TodoItem ('Buy something', 'Maybe something nice...', true),
        ];
        this.saveToStorage();
      }
      this._todos.next(Object.assign({}, this.dataStore).todos);   
    });
  }

  private loadFromStorage() {
    return this.storage.get(STORAGE_KEY);
  }

  private saveToStorage() {
    return this.storage.set(STORAGE_KEY, this.dataStore.todos);    
  }

  save() {
    this.saveToStorage();
    this._todos.next(Object.assign({}, this.dataStore).todos);    
  }

  create(todo: TodoItem) {
    //this.http.post(`${this.baseUrl}/todos`, JSON.stringify(todo)).subscribe(data => {
        this.dataStore.todos.unshift(todo);
        this.save();       
      //}, error => console.log('Could not create todo.'));
  }

  delete(todo: TodoItem) {
    var index = this.dataStore.todos.indexOf(todo);
    if (index >= 0) {
      this.dataStore.todos.splice(index, 1);
      this.save();
    }
  }

  reorder(itemFrom, itemTo) {
    var indexFrom = this.dataStore.todos.indexOf(itemFrom);
    var indexTo = this.dataStore.todos.indexOf(itemTo);
    if (indexFrom >= 0 && indexTo >= 0) {
      this.dataStore.todos.splice(indexFrom, 1);
      this.dataStore.todos.splice(indexTo, 0, itemFrom);
      this.save();
    }      
  }

  get todos() {
    return this._todos.asObservable();
  }

  get inbox() {
    return this.todos.map(todos => todos.filter(todo => todo.List == null));
  }

  get today() {
    return this.todos.map(todos => todos.filter(todo => todo.isDueToday));
  }

}
