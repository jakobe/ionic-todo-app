import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TodoItem } from '../../models/TodoItem';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';

const STORAGE_KEY = 'todoItems';

function _todoItemFromData(data) {
  return new TodoItem(data.title, data.description, data.isDone, data.dueDate, data.dueTonight, data.call);
}
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  items: TodoItem[];
  constructor(private storage: Storage) {
    this.items = [];
    this.getAll().then(result => {
      if(result) {
        this.items = result.map(_todoItemFromData);
        console.log("items: " + this.items.length);
      } else {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() -1);
        this.items = [
            new TodoItem ('Arrange music for party', 'DJ Trump', false, yesterday, true, true),
            new TodoItem ('Buy cake for mom', 'The Blueberry one she loves so much'),
            new TodoItem ('Try on new shoes', 'Those fancy ones from Adidas'),
            new TodoItem ('Buy something', 'Maybe something nice...', true),
          ];
        this.storage.set(STORAGE_KEY, this.items);     
      }
    });
  }
  
  get inbox():TodoItem[] {
    return this.items.filter(x => x.List == null);
  };
  public get today():TodoItem[] {
    return this.items.filter(x => x.isDueToday);
  };
  public add(item:TodoItem) {
    this.items = this.items.concat(item);
  }

  getAll() : Promise<any> {
    return this.storage.get(STORAGE_KEY);
  }
  saveItems() : Promise<any> {
    return this.storage.set(STORAGE_KEY, this.items);    
  }
}
