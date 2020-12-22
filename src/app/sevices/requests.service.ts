import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class RequestsService {
	
	constructor(
		private http: HttpClient
	) {}

	public get<T>(subUrl: string = ''): Observable<T> {
		return this.http.get<T>(subUrl)
			.pipe(
				map( (data: T) => data )
			);
	}


	public post<T>(subUrl: string = '', data: any = {}): Observable<T> {
		return this.http.post<T>(subUrl, data)
			.pipe(
				map( (data: T) => data )
			);
	}

	public put<T>(subUrl: string = '', data: any = {}): Observable<T> {
		return this.http.put<T>(subUrl, data)
			.pipe(
				map( (data: T) => data )
			);
	}

	public delete<T>(subUrl: string = ''): Observable<T> {
		return this.http.delete<T>(subUrl)
			.pipe(
				map( (data: T) => data )
			);
	}
}