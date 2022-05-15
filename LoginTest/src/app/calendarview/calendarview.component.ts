import {Component, Input, OnInit} from '@angular/core';
import {CalendarOptions, FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import {GoogleCalendarIntegrationComponent} from "../google-calendar-integration/google-calendar-integration.component";
import {calendar_v3} from "@googleapis/calendar";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  googleCalendarPlugin
]);

@Component({
  selector: 'app-calendarview',
  templateUrl: './calendarview.component.html',
  styleUrls: ['./calendarview.component.scss']
})
export class CalendarviewComponent implements OnInit {

  //@Input() calendarId: String;
  static events = [{}]

  static addEvent(title,start,end) {
    let event = {
      title: title,
      start: start,
      end: end
    }
    CalendarviewComponent.events.push(event)
  }

  constructor() {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    plugins: [ googleCalendarPlugin ],
    googleCalendarApiKey: 'AIzaSyAp_Insk0JjH4oxZ4I0-PLIydIno9jZEZ8',
    events: CalendarviewComponent.events
  };


  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  ngOnInit(): void {
  }

}
