import {Component, OnInit} from '@angular/core';
import {GoogleCalendarIntegrationComponent} from "./google-calendar-integration/google-calendar-integration.component";
import {SearchResultComponent} from "./search-result/search-result.component";
import {HomeComponent} from "./home/home.component";
import {AllTodosComponent} from "./all-todos/all-todos.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Login';
  hideSearch = false;

  user: gapi.auth2.GoogleUser | undefined

  pre: ''
  public static isSignedIn : boolean;

  constructor() {
  }

  ngOnInit(): void{
  }

  isSigned(): boolean{
    return AppComponent.isSignedIn
  }

  searchEvents(event: any) {
    GoogleCalendarIntegrationComponent.searchEvents(event.target.search.value)
    HomeComponent.displaySearch = true
    AllTodosComponent.displaySearch = true
    SearchResultComponent.keyword = event.target.search.value
  }

  noSearch(){
    HomeComponent.displaySearch = false
    AllTodosComponent.displaySearch = false
  }

  setHideSearch(val){
    this.hideSearch = val
  }



}
