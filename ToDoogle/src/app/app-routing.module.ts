import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from "./todo/todo.component";
import {HomeComponent} from "./home/home.component";
import {AllTodosComponent} from "./all-todos/all-todos.component";

const routes: Routes = [
  { path: 'todo', component: TodoComponent},
  { path: 'home', component: HomeComponent},
  { path: 'all-todos', component: AllTodosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
