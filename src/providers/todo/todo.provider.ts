import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { TodoItem } from '../../models/TodoItem';

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
  constructor() {
    this._todos = <BehaviorSubject<TodoItem[]>>new BehaviorSubject(undefined);
    this.loadInitialData();
  }

  loadInitialData() {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1);
    this.dataStore = { todos: [
      new TodoItem ('Arrange music for party', 'DJ Trump', false, yesterday, true, true),
      new TodoItem ('Buy cake for mom', 'The Blueberry one she loves so much'),
      new TodoItem ('Try on new shoes', 'Those fancy ones from Adidas', false, TodoItem.today),
      new TodoItem ('Buy something', 'Maybe something nice...', true),
    ] };
    this._todos.next(Object.assign({}, this.dataStore).todos);    
  }

  save() {
    this._todos.next(Object.assign({}, this.dataStore).todos);    
  }

  create(todo: TodoItem) {
    //this.http.post(`${this.baseUrl}/todos`, JSON.stringify(todo)).subscribe(data => {
        this.dataStore.todos.unshift(todo);
        this._todos.next(Object.assign({}, this.dataStore).todos);
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
