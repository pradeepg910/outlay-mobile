import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform} from 'ionic-angular';
import * as moment from 'moment';

import { PopoverController } from 'ionic-angular';
import { AddExpenseComponent } from '../add-expense/add-expense';

import {ExpensesService} from './expenses.service'

@Component({
  selector: 'expenses',
  templateUrl: 'expenses.html'
})
export class ExpensesComponent {
  public items = [];
  public currentItems = [];
  public noExpensesMessage = "Nothing spent yet.";
  public today = new Date();

  constructor(private expensesService: ExpensesService,
    private nav: NavController,
    private platform: Platform,
    private zone: NgZone,
    private modalCtrl: ModalController,
    public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.expensesService.initDB();
      this.expensesService.getAll()
        .then(data => {
          this.zone.run(() => {
            this.items = data;
            this.updateItems();
          });
        })
        .catch(console.error.bind(console));
    });
  }

  updateItems() {
    this.currentItems = this.items.filter(
      item => (item.month === this.today.getMonth() && item.year === this.today.getFullYear()));
  };

  addPopover() {
    let popover = this.popoverCtrl.create(AddExpenseComponent);
    popover.present();
  }

  delete(item) {
    this.expensesService.delete(item);
  }

  currentMonth() {
    this.today = new Date();
    this.updateItems();
  }

  previousMonth() {
    this.today = new Date(this.today.setMonth(this.today.getMonth() - 1));
    this.updateItems();
  }

  nextMonth() {
    this.today = new Date(this.today.setMonth(this.today.getMonth() + 1));
    this.updateItems();
  }

}
