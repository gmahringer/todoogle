import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo/todo.component';
import { GoogleCalendarIntegrationComponent } from './google-calendar-integration/google-calendar-integration.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { CalendarviewComponent } from './calendarview/calendarview.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { ListviewComponent } from './listview/listview.component';

import { AllTodosComponent } from './all-todos/all-todos.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { EditEventComponent } from './edit-event/edit-event.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    GoogleCalendarIntegrationComponent,
    CalendarviewComponent,
    HomeComponent,
    ListviewComponent,
    AllTodosComponent,
    EditEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
