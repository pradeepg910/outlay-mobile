import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import {ExpensesService} from '../list-expenses/expenses.service'

@Component({
  templateUrl: 'add-expense.html'
})
export class AddExpenseComponent {
  public item: any = {};

  constructor(public viewCtrl: ViewController,
    private expensesService: ExpensesService) { }

  add() {
    let now = new Date();
    this.item._id = now.toISOString();
    this.item.month = now.getMonth();
    this.item.year = now.getFullYear();

    console.log("Item: " + JSON.stringify(this.item));

    this.expensesService.add(this.item)
      .catch(console.error.bind(console));
    this.viewCtrl.dismiss();
  }
}
