import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteInfoComponent } from './note-info/note-info.component';
import { NotesService } from '../../services/notes.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { INote, INoteAction, INoteInfo } from '../../models/interfaces';
import { NoteActions } from '../../models/constants';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-notes-list',
	standalone: true,
	imports: [
		NoteCardComponent,
		NoteInfoComponent,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule,
		CommonModule,
	],
	templateUrl: './notes-list.component.html',
	styleUrl: './notes-list.component.scss',
})
export class NotesListComponent implements OnInit, OnDestroy {
	notesList: INote[] = [];
	filteredNotes: INote[] = [];
	searchedText: string = '';
	private onDestroy$: Subject<void> = new Subject();
	service: NotesService | undefined;

	constructor(private notesService: NotesService) {
		this.service = notesService;
	}

	ngOnInit() {
		this.notesList = this.getStoredNotes();
		this.filteredNotes = this.notesList;
		this.subscribeToSearch();
		this.subscribeToNoteInfo();
		this.subscribeToNoteListActions();
	}

	subscribeToSearch() {
		this.notesService.searchNote$.subscribe((value: string) => {
			this.filteredNotes = this.findNotes(value);
		});
	}

	subscribeToNoteInfo() {
		this.notesService.noteInfo$.subscribe((data: INoteInfo) => {
			const noteIndex = this.notesList.findIndex((note) => note.id === data.note.id);
			this.notesList[noteIndex].title = data.value.title;
			this.notesList[noteIndex].body = data.value.body;
			localStorage.setItem('notes', JSON.stringify(this.notesList));
		});
	}

	subscribeToNoteListActions() {
		this.notesService.noteAction$.subscribe((data: INoteAction) => {
			if (data.action === NoteActions.DELETE && this.notesService.selectedNote) {
				this.deleteNote(this.notesService.selectedNote);
			}
			if (data.action === NoteActions.ADD_EDIT) {
				this.createNote();
			}
		});
	}

	getStoredNotes() {
		const localNotes = localStorage.getItem('notes');
		return (localNotes && JSON.parse(localNotes)) || [];
	}

	createNote() {
		const notes: INote[] = this.getStoredNotes();
		const newNote = {
			id: crypto.randomUUID(),
			body: '',
			title: '',
			date: new Date().toISOString(),
		};
		const updNotes = [newNote, ...notes];
		localStorage.setItem('notes', JSON.stringify(updNotes));
		this.notesList = updNotes;
		this.filteredNotes = updNotes;
		this.notesService.handleSetSelectedNote(newNote);
		this.notesService.searchHandler('');
	}

	deleteNote(noteToDelete: INote) {
		const updNotes = this.notesList.filter((note) => note.id !== noteToDelete.id);
		localStorage.setItem('notes', JSON.stringify(updNotes));
		this.notesList = updNotes;
		this.filteredNotes = updNotes;
		this.notesService.handleSetSelectedNote(null);
		this.notesService.searchHandler('');
	}

	addEditNoteHandler() {
		this.notesService.noteAddEditHandler();
	}

	getFilterred() {
		return JSON.stringify(this.filteredNotes);
	}

	deleteNoteHandler() {
		this.notesService.noteDeleteHandler();
	}

	handleSelectNote(selectedNote: INote) {
		this.notesService.handleSetSelectedNote(selectedNote);
	}

	findNotes(value?: string) {
		this.searchedText = (value?.trim() || '').toLowerCase();
		if (!this.searchedText) {
			return this.notesList;
		}
		return this.notesList.filter(
			(note) =>
				note.title.toLowerCase().includes(this.searchedText) ||
				note.body.toLowerCase().includes(this.searchedText),
		);
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
