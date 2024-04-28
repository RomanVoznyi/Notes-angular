import { NoteActions } from './constants';

export interface INote {
	id: string;
	body: string;
	title: string;
	date: string;
}

export interface INoteInfo {
	value: {
		body: string;
		title: string;
	};
	note: INote;
}

export interface INoteAction {
	action: NoteActions;
}
