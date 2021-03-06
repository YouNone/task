import { Component } from '@angular/core';
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

export interface ITodo {
	id?: string;
    name: string;
    description: string;
    executed: boolean;
    important_task: boolean;
    date_executed: string;
	email?: string
}

export interface CanDeactivateComponent extends CanDeactivate<Component> {
	canDeactivate(): Observable<boolean> | Promise<boolean> | boolean
}
