import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INote, INoteAction, INoteInfo } from '../models/interfaces';
import { NoteActions } from '../models/constants';

@Injectable({
	providedIn: 'root',
})
export class NotesService {
	noteInfo$ = new Subject<INoteInfo>();
	noteAction$ = new Subject<INoteAction>();
	selectedNote: INote | null = null;
	selectedNote$ = new Subject<INote | null>();
	searchNote$ = new Subject<string>();

	constructor() {}

	noteAddEditHandler() {
		this.noteAction$.next({ action: NoteActions.ADD_EDIT });
	}

	noteDeleteHandler() {
		this.noteAction$.next({ action: NoteActions.DELETE });
	}

	searchHandler(value: string) {
		this.handleSetSelectedNote(null);
		this.searchNote$.next(value);
	}

	handleSetSelectedNote(value: INote | null) {
		this.selectedNote = value;
		this.selectedNote$.next(value);
	}
}
