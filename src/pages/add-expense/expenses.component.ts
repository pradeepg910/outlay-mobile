import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform} from 'ionic-angular';

import {ExpensesService} from './expenses.service'

@Component({
  selector: 'expenses',
  // templateUrl: './app/expenses/expenses.component.html',
  template: `
  <div class="bar bar-header bar-dark">
  <form (ngSubmit)="add()">
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
export class ExpensesComponent {
  public items = [];
  public item: any = {};
  constructor(private expensesService: ExpensesService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController) {}

  ionViewDidLoad() {
      this.platform.ready().then(() => {
          this.expensesService.initDB();

          this.expensesService.getAll()
              .then(data => {
                  this.zone.run(() => {
                      this.items = data;
                  });
              })
              .catch(console.error.bind(console));
      });
  }

  add() {
    this.item._id = new Date().toISOString();
    console.log(this.item._id);
              this.expensesService.add(this.item)
                  .catch(console.error.bind(console));
  }

}
