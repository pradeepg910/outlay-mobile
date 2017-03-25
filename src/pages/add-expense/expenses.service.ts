import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Item} from './Item'
@Injectable()
export class ExpensesService {
storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  addExpense(item: Item) {
    this.storage.set(item.title+':'+item.timestamp, JSON.stringify(item));
  }

  retrieveExpenses() {
    let items: Item[] = [];
    this.storage.forEach( (value, key, index) => {
      items.push(JSON.parse(value));
    });
    return items;
  }

}
