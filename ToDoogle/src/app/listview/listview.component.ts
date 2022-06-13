import { Component, OnInit } from '@angular/core';
import listPlugin from '@fullcalendar/list';
import {CalendarOptions} from "@fullcalendar/angular";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {

  modalRef: BsModalRef;

  static events = [{}]

  static addEvent(id,title,start,end,recurringEventId) {
    let event = {
      id: id,
      groupId: recurringEventId,
      title: title,
      start: start,
      end: end
    }
    ListviewComponent.events.push(event)
  }

  constructor(private modalService: BsModalService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'listDay',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.openModal.bind(this),
    plugins: [ listPlugin,googleCalendarPlugin ],
    googleCalendarApiKey: 'AIzaSyAp_Insk0JjH4oxZ4I0-PLIydIno9jZEZ8',
    events: ListviewComponent.events
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  openModal(arg) {
    EditEventComponent.id = arg.event.id ;
    EditEventComponent.recurringEventId = arg.event.groupId ;
    EditEventComponent.title = arg.event.title ;
    EditEventComponent.start = arg.event.start ;
    EditEventComponent.end = arg.event.start ;
    this.modalRef = this.modalService.show(EditEventComponent);
  }

  ngOnInit(): void {
  }

}
