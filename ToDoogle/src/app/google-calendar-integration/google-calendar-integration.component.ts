import {Component, NgZone, OnInit} from '@angular/core';
import {calendar_v3} from "@googleapis/calendar";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {AppComponent} from "../app.component";
import {CalendarviewComponent} from "../calendarview/calendarview.component";
import {ListviewComponent} from "../listview/listview.component";
import {AllTodosComponent} from "../all-todos/all-todos.component";
import {Todo} from "../todo/todo";
import {SearchResultComponent} from "../search-result/search-result.component";


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@Component({
  selector: 'app-google-calendar-integration',
  templateUrl: './google-calendar-integration.component.html',
  styleUrls: ['./google-calendar-integration.component.scss']
})

/**
 * Class for Google Login and implementation of Google Calendar API to connect the user's Google Calendar with the app
 */
export class GoogleCalendarIntegrationComponent implements OnInit {

  /**
   * True if user is logged in, false if user is not logged in
   */
  isSignedIn = false;

  /**
   * Static list for storing all events from the user's Google Calendar.
   * Necessary for the search function.
   */
  static events: Todo[] = [];

  /**
   * Adds event to the static list "events"
   * @param id - ID of event
   * @param title - Title of event
   * @param start - Start date of event
   * @param end - End date of the event
   * @param recurring - ID of recurring event if event is recurring
   * @param description - Description of the event
   * @param created - Date of the creation of the event
   */
  static addEventToList(id, title, start, end,recurring, description,created) {
    GoogleCalendarIntegrationComponent.events.push({
      creationDate: created,
      recurrence: recurring,
      id: id,
      title: title,
      description: description,
      startDate: start,
      dueDate: end});
  }

  constructor(private zone: NgZone) {}

  /**
   * Initialisation of Google client to enable login with Google and access to the user's Google Calendar
   * apiKey - api key of the Google project created in Google Developer Console
   * clientId - client id of the Google project created in Google Developer Console
   * discoveryDocs - Discovery document for the Google Calendar API
   * scope -  to access Google Calendar API
   */
  initClient() {
    const updateSigninStatus = this.updateSigninStatus.bind(this);
    gapi.client
        .init({
          apiKey: 'AIzaSyAD7oU4SX_TFkMuyRrslxzmC4d1l4ZOoDw',
          clientId:
              '673715156389-deloqkk3nhkoinbaocl80bvt1kkigeit.apps.googleusercontent.com',
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: 'https://www.googleapis.com/auth/calendar',
        })
        .then(() => {
          this.zone.run(() => {

            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          });
        });
  }

  /**
   * Updates the "isSignedIn" field in this class and in AppComponent if user signs in or logs out
   * @param isSignedIn
   */
  updateSigninStatus(isSignedIn) {
    console.log('updateSigninStatus', isSignedIn);
    this.isSignedIn = isSignedIn;
    AppComponent.isSignedIn = isSignedIn;
    if (isSignedIn) {
      this.listUpcomingEvents();
    }
  }

  /**
   * Signs the user in
   */
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   * Signs the user out
   */
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Loads the Google API
   */
  loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    window.document.body.appendChild(script);
    return new Promise<void>((resolve, reject) => {
      script.addEventListener('error', (error) => reject(error));
      script.addEventListener('load', () => resolve());
    });
  }

  async ngOnInit() {
    await this.loadGapi();
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  /**
   * Adds a user-defined event to the user's Google Calendar.
   * @param title - Title of event
   * @param description - Description of the event
   * @param startDate - Start date of event
   * @param dueDate - End date of the event
   * @param recurrence - Frequency of recurrence (daily, weekly, monthly, yearly)
   */
  static addEvent(title,description,startDate,dueDate,recurrence) {
    startDate = startDate.toString() + ':00+02:00'
    dueDate = dueDate.toString() + ':00+02:00'
    let event: calendar_v3.Schema$Event
    if(recurrence.name === 'wöchentlich'){
      event = {
        summary: title,
        description: description,
        start: {
          dateTime: startDate,
          timeZone: 'Europe/Vienna'
        },
        end: {
          dateTime: dueDate,
          timeZone: 'Europe/Vienna'
        },
        recurrence: ['RRULE:FREQ=WEEKLY']
      }
    }
    else if(recurrence.name === 'täglich'){
      event = {
        summary: title,
        description: description,
        start: {
          dateTime: startDate,
          timeZone: 'Europe/Vienna'
        },
        end: {
          dateTime: dueDate,
          timeZone: 'Europe/Vienna'
        },
        recurrence: ['RRULE:FREQ=DAILY']
      }
    }
    else if(recurrence.name === 'monatlich'){
      event = {
        summary: title,
        description: description,
        start: {
          dateTime: startDate,
          timeZone: 'Europe/Vienna'
        },
        end: {
          dateTime: dueDate,
          timeZone: 'Europe/Vienna'
        },
        recurrence: ['RRULE:FREQ=MONTHLY']
      }
    }
    else if(recurrence.name === 'jährlich'){
      event = {
        summary: title,
        description: description,
        start: {
          dateTime: startDate,
          timeZone: 'Europe/Vienna'
        },
        end: {
          dateTime: dueDate,
          timeZone: 'Europe/Vienna'
        },
        recurrence: ['RRULE:FREQ=YEARLY']
      }
    }
    else{
      event = {
        summary: title,
        description: description,
        start: {
          dateTime: startDate,
          timeZone: 'Europe/Vienna'
        },
        end: {
          dateTime: dueDate,
          timeZone: 'Europe/Vienna'
        },
      }
    }

    let request = gapi.client['calendar'].events.insert({
      calendarId: 'primary',
      resource: event
    });

    request.execute(function() {
    });
  }

  /**
   * Deletes an event from the user's Google Calendar
   * @param id - deletion is based on the ID of the Google Event
   */
  static deleteEvent(id){
    let request = gapi.client['calendar'].events.delete({
      calendarId: 'primary',
      eventId: id
    });

    request.execute(function() {
    });
  }

  /**
   * Deletes all instances of a recurring event from the user's Google Calendar
   * @param groupId - deletion is based on the recurring ID of the Google Event
   */
  static deleteAll(groupId){
    let request = gapi.client['calendar'].events.delete({
      calendarId: 'primary',
      eventId: groupId
    });

    request.execute(function() {
    });
  }

  /**
   * Retrieves all events from the user's Google Calendar
   * and adds them to the different views (calendar view, list view, all events view) and to the class's static list of events.
   */
  listUpcomingEvents() {
    let events;
    gapi.client['calendar'].events
        .list({
          calendarId: 'primary',
          showDeleted: false,
          singleEvents: true,
          orderBy: 'startTime',
        })
        .then((response) => {
          this.zone.run(() => {
            events = response.result.items;

            if (events.length > 0) {
              for (const event of events) {
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  CalendarviewComponent.addEvent(event.id, event.summary, event.start.date, event.end.date,event.recurringEventId);
                }
                else {
                  CalendarviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  ListviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                else {
                  ListviewComponent.addEvent(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  AllTodosComponent.addEvent(event.id,event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                else {
                  AllTodosComponent.addEvent(event.id,event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId);
                }
                if(event.start.dateTime == null && event.end.dateTime ==null) {
                  GoogleCalendarIntegrationComponent.addEventToList(event.id, event.summary, event.start.date, event.end.date,event.recurringEventId,event.description, event.created);
                }
                else {
                  GoogleCalendarIntegrationComponent.addEventToList(event.id, event.summary, event.start.dateTime, event.end.dateTime,event.recurringEventId,event.description, event.created);
                }
                let when = event.start.dateTime;
                if (!when) {
                  when = event.start.date;
                }
              }
            }
          });
        });
  }

  /**
   * Implements the search function.
   * If an event's title from the static list of events contains the keyword, the event is added to the SearchResultComponent
   * @param keyword - Search is made for a keyword defined by the user
   */
  static searchEvents(keyword) {
    SearchResultComponent.events = [];
    if (GoogleCalendarIntegrationComponent.events.length > 0) {
      for (const event of GoogleCalendarIntegrationComponent.events) {
        if (event.title.toUpperCase().includes(keyword.toUpperCase())) {
          SearchResultComponent.addEvent(event.id, event.title, event.startDate, event.dueDate,event.recurrence);
        }
      }
    }
  }




}

