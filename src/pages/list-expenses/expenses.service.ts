import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class ExpensesService {



  private _db;
  private _items;

  initDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this._db = new PouchDB('expenses-items.db');
  }

  add(item) {
    return this._db.put(item);
  }

  delete(item) {
    return this._db.remove(item._id, item._rev);
  }

  getAll() {
    if (!this._items) {
      return this._db.allDocs({ include_docs: true })
        .then(docs => {
          this._items = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);
          return this._items;
        });
    } else {
      return Promise.resolve(this._items);
    }
  }

  private onDatabaseChange = (change) => {
    var index = this.findIndex(this._items, change.id);
    var item = this._items[index];

    if (change.deleted) {
      if (item) {
        this._items.splice(index, 1); // delete
      }
    } else {
      change.doc.Date = new Date(change.doc.Date);
      if (item && item._id === change.id) {
        this._items[index] = change.doc; // update
      } else {
        this._items.splice(index, 0, change.doc) // insert
      }
    }
  }

  // Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }

}
