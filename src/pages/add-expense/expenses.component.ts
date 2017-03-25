import {Component, OnInit} from '@angular/core'
import { NavController } from 'ionic-angular';
import {Item} from './Item';
import {ExpensesService} from './expenses.service'

@Component({
  selector: 'expenses',
  // templateUrl: './app/expenses/expenses.component.html',
  template: `
  <div class="bar bar-header bar-dark">
  <form (ngSubmit)="addExpense()">
  <h1 class="title">Add Expense</h1>
      <ion-item>
        <ion-label>Title</ion-label>
        <ion-input type="text" [(ngModel)]="item.title" name="title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Amount</ion-label>
        <ion-input type="number" [(ngModel)]="item.amount" name="amount"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-textarea [(ngModel)]="item.description" name="description"></ion-textarea>
      </ion-item>
      <button ion-button type="submit" block>Add</button>
    </form>
    <ion-list>
      <button ion-item *ngFor="let item of items">
        <h2>{{ item.title }} - {{item.amount}}</h2>
        <p>{{ item.description }}</p>
      </button>
    </ion-list>
    </div>`
  // styleUrls: [ './app/expenses/expenses.component.css' ]
})
export class ExpensesComponent { //implements OnInit{
  items: Item[];
  item= new Item('', 0, '', new Date().toLocaleString());
  constructor(public navCtrl: NavController, public expensesService: ExpensesService) {
    this.expensesService = expensesService;
    this.items = this.expensesService.retrieveExpenses();
  }

  addExpense() {
    this.expensesService.addExpense(this.item);
  }

}
