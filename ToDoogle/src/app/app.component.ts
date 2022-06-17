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

  /**
   * Returns true if the user is signed in.
   * Required for displaying different views whose visibility depends on the login status.
   */
  isSigned(): boolean{
    return AppComponent.isSignedIn
  }

  /**
   * Calls the searchEvent function in the GoogleCalendarIntegrationComponent.
   * Hides the "Übersicht" view and the "Alle Einträge" view, so that only the results of the search are visible.
   * @param event
   */
  searchEvents(event: any) {
    GoogleCalendarIntegrationComponent.searchEvents(event.target.search.value)
    HomeComponent.displaySearch = true
    AllTodosComponent.displaySearch = true
    SearchResultComponent.keyword = event.target.search.value
  }

  /**
   * Hides the results of the search, so that the "Übersicht" view and the "Alle Einträge" view are visible.
   */
  noSearch(){
    HomeComponent.displaySearch = false
    AllTodosComponent.displaySearch = false
  }

  setHideSearch(val){
    this.hideSearch = val
  }



}
