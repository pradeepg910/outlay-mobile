import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CommonModule } from '@angular/common';

import {ExpensesComponent} from '../pages/list-expenses/expenses';
import {ExpensesService} from '../pages/list-expenses/expenses.service';
import {AddExpenseComponent} from '../pages/add-expense/add-expense';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ExpensesComponent,
    AddExpenseComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ExpensesComponent,
    AddExpenseComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ExpensesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
