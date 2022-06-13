import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {CalendarOptions} from "@fullcalendar/angular";
import listPlugin from "@fullcalendar/list";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  modalRef: BsModalRef;

  static events = [{}]
  static keyword =''

  static addEvent(id, title, start, end,recurringEventId) {
    let event = {
      id: id,
      groupId: recurringEventId,
      title: title,
      start: start,
      end: end
    }
    SearchResultComponent.events.push(event)
  }

  keyword(){
    return SearchResultComponent.keyword
  }

  constructor(private modalService: BsModalService) {}

  openModal(arg) {
    EditEventComponent.id = arg.event.id ;
    EditEventComponent.recurringEventId = arg.event.groupId ;
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
    events: SearchResultComponent.events
  };


  ngOnInit(): void {
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

}
