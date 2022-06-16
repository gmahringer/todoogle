import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * Class for the tab "Übersicht".
 * Displays the view "Heute" (ListviewComponent) or the view "Kalenderansicht" (CalendarviewComponent)
 * depending on the user's choice.
 */
export class HomeComponent implements OnInit {

  /**
   * Set to false if the user chooses the view "Heute" which lists the events from the user's Google Calendar by days.
   * Set to true if the user chooses the view "Kalenderansicht" which displays the events from the user's Google Calendar in a calendar.
   */
  displayCalendar = false;

  /**
   * If set to true, the results of the search function are displayed instead of the view "Heute" or "Kalendaransicht"
   */
  static displaySearch = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Called when the user chooses the view "Kalendaransicht"
   * Sets the variable "displayCalendar" to true so the events from the user's Google Calendar are displayed in a calendar.
   *
   */
  showCalendar() {
    this.displayCalendar = true;
  }

  /**
   * Called when the user chooses the view "Heute"
   * Sets the variable "displayCalendar" to false so the events from the user's Google Calendar are listed by days.
   *
   */
  showList() {
    this.displayCalendar = false;
  }

  /**
   * Called when the user searches for a keyword.
   * If returns true, the results of the search function are displayed instead of the view "Heute" or "Kalendaransicht"
   */
  showSearch() {
    return HomeComponent.displaySearch;
  }

}
