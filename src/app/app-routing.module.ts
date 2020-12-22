import { LeaveUnsavedComponentGuard } from './sevices/leave.unsaved.component.guard';
import { TodoComponent } from './components/todo/todo.component';
import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },

  { path: 'todo', component: ListComponent},
  { path: 'todoedit' + '/:id', component: TodoComponent, canDeactivate: [LeaveUnsavedComponentGuard] },
  { path: 'todoedit', component: TodoComponent, canDeactivate: [LeaveUnsavedComponentGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
