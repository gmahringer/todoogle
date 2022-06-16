import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DeleteEventComponent} from "../delete-event/delete-event.component";
import {CalendarOptions} from "@fullcalendar/angular";
import listPlugin from "@fullcalendar/list";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})

/**
 * Class for showing the results of the search function.
 * Lists all events from the user's Google Calendar whose title contains the searched word.
 */
export class SearchResultComponent implements OnInit {

  /**
   * Variable required for the delete-event popup.
   */
  modalRef: BsModalRef;

  /**
   * Static list for storing all events from the user's Google Calendar.
   */
  static events = [{}]

  /**
   * Static variable for searching the events whose title contains the searched keyword.
   */
  static keyword =''

  /**
   * Adds event to the static list "events"
   * @param id - ID of event
   * @param title - Title of event
   * @param start - Start date of event
   * @param end - End date of the event
   * @param recurringEventId - ID of recurring event if event is recurring
   */
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

  /**
   * Returns the value of the static variable "keyword" so it can be accessed in search-result.component.html.
   */
  keyword(){
    return SearchResultComponent.keyword
  }

  /**
   * Constructor for the class
   * @param modalService - Bootstrap modal required for the delete-event popup
   */
  constructor(private modalService: BsModalService) {}

  /**
   * Sets static fields of the DeleteEventComponent class to enable the delete-event popup when double-clicking on the event.
   */
  openModal(arg) {
    DeleteEventComponent.id = arg.event.id ;
    DeleteEventComponent.recurringEventId = arg.event.groupId ;
    DeleteEventComponent.title = arg.event.title ;
    DeleteEventComponent.start = arg.event.start ;
    DeleteEventComponent.end = arg.event.start ;
    this.modalRef = this.modalService.show(DeleteEventComponent);
  }

  /**
   * Creates FullCalendar for displaying events retrieved from the user's Google Calendar and added to SearchResultComponent's "events" list.
   * initialView: 'listYear' - The result events of the search are listed by years.
   * eventClick - If the user clicks on the event, the delete-event popup becomes visible.
   * events - Events present in SearchResultComponent's "events" list are passed to the FullCalendar to be displayed.
   */
  calendarOptions: CalendarOptions = {
    initialView: 'listYear',
    eventClick: this.openModal.bind(this),
    plugins: [listPlugin],
    events: SearchResultComponent.events
  };


  ngOnInit(): void {
  }


}
