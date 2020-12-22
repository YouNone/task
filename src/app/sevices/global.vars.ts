import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {	
	/** Массив предустановленных констант приложения */
	private data = {

		'storage': 					'localStorage',				
		'urlKeyStart':				'_start',					
		'urlKeyLimit':				'_limit',					
		'urlKeySort':				'_sort',					
		'urlKeyOrder':				'_order',					

		'startListLen':				20,							
		'autocompleteListLen':		20,							
	};

	constructor() {}
	// Возвращает значение константы приложения. 
	get(key: string): any{
		if(this.data[key] === undefined) return ''; else return this.data[key];
	}


	// Устанавливает значение константы приложения. 
	set(key: string, val: string){
		this.data[key] = val;
	}
}
