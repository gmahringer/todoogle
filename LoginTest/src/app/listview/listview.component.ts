import { Component, OnInit } from '@angular/core';
//import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import {CalendarOptions, FullCalendarModule} from "@fullcalendar/angular";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
//import interactionPlugin from "@fullcalendar/interaction";
//import dayGridPlugin from "@fullcalendar/daygrid";

/*FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  //dayGridPlugin,
  //interactionPlugin,
  //listPlugin
]);*/

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {

  constructor() { }

  calendarOptions: CalendarOptions = {
    initialView: 'listDay',
    dateClick: this.handleDateClick.bind(this),
    plugins: [ listPlugin,googleCalendarPlugin ],
    googleCalendarApiKey: 'AIzaSyAp_Insk0JjH4oxZ4I0-PLIydIno9jZEZ8',
    events: {
      googleCalendarId: 'todoogle94@gmail.com' //static information
    }
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  ngOnInit(): void {
  }

}
