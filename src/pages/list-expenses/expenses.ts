import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform} from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { AddExpenseComponent } from '../add-expense/add-expense';

import {ExpensesService} from './expenses.service'

@Component({
  selector: 'expenses',
  templateUrl: 'expenses.html'
})
export class ExpensesComponent {
  public items = [];
  public noExpensesMessage = "Nothing spent yet.";

  constructor(private expensesService: ExpensesService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController,
        public popoverCtrl: PopoverController) {}

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

  addPopover() {
     let popover = this.popoverCtrl.create(AddExpenseComponent);
     popover.present();
   }

   delete(item) {
     console.log("Item: "+item);
     this.expensesService.delete(item);
   }
}
