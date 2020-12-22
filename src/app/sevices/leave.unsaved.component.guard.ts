import { CanDeactivateComponent } from './../model/type';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class LeaveUnsavedComponentGuard {

	constructor() { }

	canDeactivate(component: CanDeactivateComponent): Observable<boolean> | Promise<boolean> | boolean {
		return component.canDeactivate ? component.canDeactivate() : true;
	}
}