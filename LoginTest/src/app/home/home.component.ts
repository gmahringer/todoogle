import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayCalendar = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  showCalendar() {
    this.displayCalendar = true;
  }

  showList() {
    this.displayCalendar = false;
    //this.http.get<any>("https://www.googleapis.com/calendar/v3/calendars/calendarId/events");
  }
}
