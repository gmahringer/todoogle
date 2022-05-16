import {Component, OnInit} from '@angular/core';
import {CalendarOptions, FullCalendarModule} from "@fullcalendar/angular";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import listPlugin from '@fullcalendar/list';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {EditEventComponent} from "../edit-event/edit-event.component";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  listPlugin,
  interactionPlugin
]);

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})

export class AllTodosComponent implements OnInit {

  modalRef: BsModalRef;

  static events = [{}]

  static addEvent(id, title, start, end) {
    let event = {
      id: id,
      title: title,
      start: start,
      end: end
    }
    AllTodosComponent.events.push(event)
  }

  constructor(private modalService: BsModalService) {}

  openModal(arg) {
    EditEventComponent.id = arg.event.id ;
    EditEventComponent.title = arg.event.title ;
    EditEventComponent.start = arg.event.start ;
    EditEventComponent.end = arg.event.start ;
    this.modalRef = this.modalService.show(EditEventComponent);
  }

  calendarOptions: CalendarOptions = {
    initialView: 'listYear',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.openModal.bind(this),
    plugins: [listPlugin],
    googleCalendarApiKey: 'AIzaSyAp_Insk0JjH4oxZ4I0-PLIydIno9jZEZ8',
    events: AllTodosComponent.events
  };


  ngOnInit(): void {
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }


}
