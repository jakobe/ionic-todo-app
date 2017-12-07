import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { TodoApp } from './app.component';
import { HomePage } from '../pages/home/home.component';
import { InboxPage } from '../pages/inbox/inbox.component';
import { TodayPage } from '../pages/today/today.component';
import { TodoList } from '../components/todolist.component';
import { TodoProvider } from '../providers/todo/todo.provider';
import { APP_CONFIG, CONFIG } from './config/app.config';
import { registerServiceWorkerAndCheckForUpdate } from './app.initializer.provider';

@NgModule({
  declarations: [
    TodoApp,
    HomePage,
    InboxPage,
    TodayPage,
    TodoList
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TodoApp, null, {
      links: [
        {component: HomePage, name: 'Home', segment: ''},
        {component: InboxPage, name: 'Inbox', segment: 'inbox', defaultHistory: [HomePage]},
        {component: TodayPage, name: 'Today', segment: 'today', defaultHistory: [HomePage]},
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TodoApp,
    HomePage,
    InboxPage,
    TodayPage
  ],
  providers: [
    TodoProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_CONFIG, useValue: CONFIG},
    {
      provide: APP_INITIALIZER,
      useFactory: registerServiceWorkerAndCheckForUpdate,
      deps: [ToastController],
      multi: true
    },
  ]
})
export class AppModule {}
