import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import {ExpensesService} from '../list-expenses/expenses.service'

@Component({
  templateUrl: 'add-expense.html'
})
export class AddExpenseComponent {
  public item: any = {};

  constructor(public viewCtrl: ViewController,
    private expensesService: ExpensesService) {}

  add() {
      this.item._id = new Date().toISOString();
      this.expensesService.add(this.item)
                    .catch(console.error.bind(console));
      this.viewCtrl.dismiss();
    }
}
