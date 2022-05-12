import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo/todo.component';
import { GoogleCalendarIntegrationComponent } from './google-calendar-integration/google-calendar-integration.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AppComponent } from './app.component';
import { CalendarviewComponent } from './calendarview/calendarview.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { ListviewComponent } from './listview/listview.component';
import * as myGlobals from 'globals';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    GoogleCalendarIntegrationComponent,
    CalendarviewComponent,
    HomeComponent,
    ListviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
