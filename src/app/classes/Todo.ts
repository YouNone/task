import { ITodo } from '../model/type';

export class Todo implements ITodo {
	id?: string;
    name: string;
    description: string;
    executed: string;
    important_task: string;
    date_executed: string;
	email?: string
	constructor(
		data: Todo = <ITodo>{}
	) {
		this.id = data.id || undefined;
		this.name = data.name || '';
		this.description = data.description || '';
		this.executed = data.executed || undefined;
		this.important_task = data.important_task || undefined;
		this.date_executed = data.date_executed || undefined;
		this.email = data.email || '';

	}
}
