import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InboxPage } from '../pages/inbox/inbox';
import { TodayPage } from '../pages/today/today';
import { TodoList } from '../components/todolist';
import { DataProvider } from '../providers/data/data';
import { APP_CONFIG, CONFIG } from './config/app.config';
import { TodoProvider } from '../providers/todo/todo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InboxPage,
    TodayPage,
    TodoList
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InboxPage,
    TodayPage
  ],
  providers: [
    DataProvider,
    TodoProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_CONFIG, useValue: CONFIG}
  ]
})
export class AppModule {}
