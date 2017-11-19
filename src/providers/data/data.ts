import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TodoItem } from '../../models/TodoItem';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'todoItems';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  items: {
    inbox: TodoItem[];
    today: TodoItem[];
  };
  constructor(public storage: Storage) {
    this.items = {
      inbox: [],
      today: []
    };
    this.getAll().then(result => {
      if(result) {
        this.items = result;
      } else {
        debugger;
        this.items = {
          inbox: [
            new TodoItem ('Buy something', 'Maybe something nice...', true),
            new TodoItem ('Try on new shoes', 'Those fancy ones from Adidas'),
            new TodoItem ('Show Ebbe Ionic', 'He would benefit...'),
          ],
          today: [
            new TodoItem ('Arrange music for party', 'DJ Trump', false, new Date(), true),
            new TodoItem ('Buy cake for mom', 'The Blueberry one she loves so much'),
            new TodoItem ('Buy cake for mom', 'The Blueberry one she loves so much'),
          ] 
        };
        this.storage.set(STORAGE_KEY, this.items);     
      }
    });
  }
  getAll() : Promise<any> {
    return this.storage.get(STORAGE_KEY);
  }
  saveItems() : Promise<any> {
    return this.storage.set(STORAGE_KEY, this.items);    
  }
}
