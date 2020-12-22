import { Injectable } from '@angular/core';

@Injectable()
export class MsgList {

	private msg = {
		
		eFieldToShort:					'Field to short',
		eFieldRequired:					'Field is required',
	
		mRecordSuccessEdit:				'Success edit',
		mRecordSuccessAdd:				'Success add',
		mConfirmRecordDelete:			'Confirm record delete?',
		mTodoSuccessAdd:				'Success add',
		mTodoSuccessEdit:				'Success edit',
		mConfirmtodoDelete:				'You want to delete this?',

		btnOk:							'Ok',

	}

	public getMsg(key: string): string {
		return this.msg[key];
	}

	public getMsgFormat(key: string, ...args: any[]): string{
		let res: string = this.msg[key];
		for(let count = 1; count < arguments.length; count++){
			let reg = RegExp('\\{' + (count-1) + '\\}', 'gi');
			res = res.replace(reg, arguments[count]);
		}
		return res;
	}
}
