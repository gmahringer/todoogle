import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayCalendar = false;
  static displaySearch = false;

  constructor() { }

  ngOnInit(): void {
  }

  showCalendar() {
    this.displayCalendar = true;
  }

  showList() {
    this.displayCalendar = false;
  }

  showSearch() {
    return HomeComponent.displaySearch;
  }

}
