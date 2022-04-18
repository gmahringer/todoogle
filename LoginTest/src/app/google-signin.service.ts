import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {

  private auth2: gapi.auth2.GoogleAuth | undefined
  private subject = new ReplaySubject<gapi.auth2.GoogleUser | undefined>(1)

  constructor() {
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '673715156389-deloqkk3nhkoinbaocl80bvt1kkigeit.apps.googleusercontent.com'
      })
    })
  }

  public signin(){
    this.auth2?.signIn({
      //
    }).then(user => {
      this.subject.next(user)
      }).catch(() =>{
        this.subject.next(undefined)
    })
  }

  public signout(){
    this.auth2?.signOut().then( () => {
      this.subject.next(undefined)
    })
  }

 public observable() : Observable<gapi.auth2.GoogleUser | undefined>{
    return this.subject.asObservable()
 }
}
