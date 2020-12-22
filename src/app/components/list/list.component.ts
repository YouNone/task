import { TodoService } from 'src/app/sevices/todo.service';
import { GlobalVars } from './../../sevices/global.vars';
import { MsgList } from './../../sevices/msg.list';
import { ITodo } from './../../model/type';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  todos: ITodo[] = [];
  displayedColumns: string[] = ['name', 'description', 'email', 'executed', 'important_task', 'date_executed','action'];
  state = {
    orderField: "name",
    order: "asc"
  }
  currDate = new Date().toLocaleString();

  constructor(
    private todoservice: TodoService,
    private $SETTINGS: GlobalVars,
    private router: Router,
    private $MSG: MsgList,

  ) {
    this.todoservice.setServiceUrl('todo');	
   }

  todoLoad(
    startNum: number,
    todoAmout: number,
    orderField,
		order
  ) {
    this.todoservice.getTodoList(startNum, todoAmout, orderField, order)
      .subscribe((newTodo: ITodo[]) => {
        this.todos = this.todos.concat(newTodo);
      });
  }

  todosReload(
    orderField,
		order,
  ) {
    this.todoservice.getTodoList(0, this.$SETTINGS.get("startListLen"), orderField, order)
      .subscribe((newTodo: ITodo[]) => {
        this.todos = newTodo;
      });
  }

  ngOnInit() {
    this.todoLoad(
      this.todos.length,
      this.$SETTINGS.get("listIncrement"),
      this.state.orderField,
      this.state.order
    );
  }

  sortChange(e) {
    console.log(e);
    this.state.order = e.direction;
    this.state.orderField = e.active;
    this.todosReload(this.state.orderField, this.state.order);
  }

  editTodo(item: ITodo) {    
    console.log(this.router.url, 'todoedit', item.id);
    
		this.router.navigate(['todoedit', item.id]);
	}

  todoDelete(e: MouseEvent, id: number) {
    e.stopPropagation();
    if (confirm(this.$MSG.getMsg("mConfirmtodoDelete"))) {
      this.todoservice.deleteTodo(id).subscribe((deletedItem: ITodo) => {
        this.todos = this.todos.filter(item => +item.id !== id);
      });
    }
  }

}