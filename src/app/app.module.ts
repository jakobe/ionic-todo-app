import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.component';
import { InboxPage } from '../pages/inbox/inbox.component';
import { TodayPage } from '../pages/today/today.component';
import { TodoList } from '../components/todolist.component';
import { TodoProvider } from '../providers/todo/todo.provider';
import { APP_CONFIG, CONFIG } from './config/app.config';

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
    TodoProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_CONFIG, useValue: CONFIG}
  ]
})
export class AppModule {}
