import { LeaveUnsavedComponentGuard } from './sevices/leave.unsaved.component.guard';
import { MatInputModule } from '@angular/material/input';
import { RequestsService } from './sevices/requests.service';
import { GlobalVars } from './sevices/global.vars';
import { TodoService } from 'src/app/sevices/todo.service';
import { MsgList } from './sevices/msg.list';
import { AngMaterialModule } from './ang.material.module';
import { TodoComponent } from './components/todo/todo.component';
import { ListComponent } from './components/list/list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    AngMaterialModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule,
    InfiniteScrollModule

  ],
  exports: [
    AngMaterialModule
  ],
  providers: [
    MsgList,
    TodoService,
    GlobalVars,
    RequestsService,
    LeaveUnsavedComponentGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
