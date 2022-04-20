import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GoogleSigninService} from "./google-signin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void{
  }


}
