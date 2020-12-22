import { ITodo } from './../model/type';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { RequestsService } from './requests.service';
import { GlobalVars } from './global.vars';
import { MsgList } from './msg.list';
@Injectable()
export class TodoService {
    constructor(
        private request: RequestsService,
        private $SETTINGS: GlobalVars,
        private $MSG: MsgList,
        private $NOTE: NotificationsService
    ) { }

    serviceUrl: string = "";

    showError(myMessage: string, err?: HttpErrorResponse) {
        this.$NOTE.error(
            this.$MSG.getMsg('error'),
            myMessage + (err ? `<br>${err.message}` : '')
        );
    }

    setServiceUrl(url) {
		this.serviceUrl = url;
	}

    getTodoList(start: number = 0, limit: number = 20, sort: string = "", order: string = ""): Observable<ITodo[]> {
        let url = 'http://localhost:3000/';
        let addCond: string[] = [];

        addCond.push(`${this.serviceUrl}?${this.$SETTINGS.get('urlKeyStart')}=${start}`);
		addCond.push(`${this.$SETTINGS.get('urlKeyLimit')}=${limit}`);

        if (sort === '') sort = 'name';
		addCond.push(`${this.$SETTINGS.get('urlKeySort')}=${sort}`);

		if (order === '' || order === 'asc') order = 'asc'; else order = 'desc';
        addCond.push(`${this.$SETTINGS.get('urlKeyOrder')}=${order}`);
        
        url += addCond.join('&');

        console.log(url);
        return this.request.get<ITodo[]>(url)
    }

    deleteTodo(id: number): Observable<ITodo> {
        let url = `http://localhost:3000/todo/${id}`;
        return this.request
            .delete<ITodo>(url).pipe(
                map((data: ITodo) => data)
            );
    }

    getTodo(id: number): Observable<ITodo> {
        let url = `http://localhost:3000/todo/${id}`;
        return this.request
            .get<ITodo>(url).pipe(
                map((data: ITodo) => data)
            );
    }

    createTodo(todo: ITodo): Observable<ITodo> {
        console.log(this.serviceUrl, todo);
        
        return this.request
            .post<ITodo>('http://localhost:3000/todo', todo).pipe(
                map((data: ITodo) => data)
            );
    }

    updateTodo(todo: ITodo): Observable<ITodo> {
        let url = `http://localhost:3000/todo/${todo.id}`;
        return this.request
            .put<ITodo>(url, todo).pipe(
                map((data: ITodo) => data)
            );
    }
}
