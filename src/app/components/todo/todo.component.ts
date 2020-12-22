import { Observable } from 'rxjs';
import { ITodo } from './../../model/type';
import { MsgList } from './../../sevices/msg.list';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/classes/Todo';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/sevices/todo.service';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, CanDeactivate<TodoComponent>  {
	todo: ITodo;
	savedState: ITodo;
	todoForm: FormGroup;
	ctrl: { [key: string]: AbstractControl; };
	currId: string;
	isReady: boolean = false;
	isChanged: boolean = false;
	$formSubscr: Subscription;
	excludeFieldList: string[] = []

	constructor(
		public $MSG: MsgList,
		public todoService: TodoService,
		public snackBar: MatSnackBar,
		public router: Router,
		public route: ActivatedRoute,
	) {
		this.todo = new Todo(<ITodo>{});
		this.savedState = undefined;
	}

	initState() {
		this.todoForm = new FormGroup({
			name: new FormControl("", [Validators.required]),
			description: new FormControl("", [Validators.required]),
			executed: new FormControl(null, [Validators.required]),
			important_task: new FormControl(null, [Validators.required]),
			email: new FormControl("", [Validators.required, Validators.email]),
			date_executed: new FormControl(null, [Validators.required]),

		});
	}

	createStateItem(item: ITodo) {
		this.savedState = {
			id: item.id,
			name: item.name,
			email: item.email, 
			executed: item.executed, 
			description: item.description, 
			important_task: item.important_task, 
			date_executed: item.date_executed
		};
	}

	ngOnInit() {
		this.todoService.setServiceUrl('todo');
		this.initState();
		this.ctrl = this.todoForm.controls;
		this.currId = this.route.snapshot.params["id"];

		if (this.currId !== undefined) {
			this.todoService.getTodo(+this.currId)
				.subscribe((data: ITodo) => {
					this.todo = new Todo(data)
					this.todoForm.patchValue({
						name: this.todo.name,
						email: this.todo.email,
						description: this.todo.description,
						executed: this.todo.executed,
						important_task: this.todo.important_task,
						date_executed: this.todo.date_executed
					});
					this.isReady = true;
				});
		} else {
			this.isReady = true;
			this.$formSubscr = this.todoForm.valueChanges
			.subscribe(formValues => {
				this.applyFormValues(formValues);
			});
		}
	}

	getErrMes(field) {
		return this.todoForm.get(field).hasError('required') ? this.$MSG.getMsg("eFieldToShort") : '';
	}

	isFormValid(): boolean {
		return true;
	}

	formSubmit() {
		if (this.isFormValid()) {
			if (this.todo.id) {

				console.log("update", this.todo);
				this.todoService.updateTodo(this.todo)
					.subscribe((todo: ITodo) => {
						if (todo.id) {
							this.createStateItem(todo);
							console.log("update", todo);
							this.openSnackBar(this.$MSG.getMsg("mTodoSuccessEdit"), this.$MSG.getMsg("btnOk"));
						}
					});
			} else {
				console.log("create", this.todo);
				this.todoService.createTodo(this.todo)
					.subscribe((todo: ITodo) => {
						if (todo.id) {
							this.todo = todo;
							this.createStateItem(todo);
						}
						this.openSnackBar(this.$MSG.getMsg("mTodoSuccessAdd"), this.$MSG.getMsg("btnOk"));
					});
			}
			console.log("successuly", this.todo);
			this.todoForm.markAsUntouched();
			this.isChanged = false;

		} else {
			alert("wrong data sended!");
			return false;
		}
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 3000
		});
	}

	canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
		if (this.todoForm.dirty) this.isChanged = true;

		if (this.isChanged) {
			console.log("change");
		}
		return true;
	}

	applyFormValues(formValues) {
		for (const key in formValues) {
			if(formValues[key] === this.todo[key]) continue;
			if(this.excludeFieldList.includes(key)) break;
			this.todo[key] = formValues[key];			
			break;
		}
	}

	clearChanges() {
		this.isChanged = false;
		this.todoForm.markAsUntouched();
		this.todoForm.markAsPristine();
	}

	ngOnDestroy(): void {
		if (this.$formSubscr) this.$formSubscr.unsubscribe();
	}
}
