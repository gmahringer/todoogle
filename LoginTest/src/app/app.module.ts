import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {AlertModule} from "ngx-bootstrap/alert";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AlertModule.forRoot(),
    AlertModule,
    AuthModule
  ],

  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }