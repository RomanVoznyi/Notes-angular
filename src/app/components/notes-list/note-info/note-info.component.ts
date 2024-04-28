import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { NotesService } from '../../../services/notes.service';
import { INote } from '../../../models/interfaces';
import { getDetailedDate } from '../../../services/utils';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-note-info',
	standalone: true,
	imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
	templateUrl: './note-info.component.html',
	styleUrl: './note-info.component.scss',
})
export class NoteInfoComponent implements OnInit, OnDestroy {
	note: INote | null = null;
	noteDate: string = '';

	@ViewChild('titleTextarea', { static: true })
	titleTextarea!: ElementRef;

	@ViewChild('bodyTextarea', { static: true })
	bodyTextarea!: ElementRef;

	private onDestroy$: Subject<void> = new Subject();

	constructor(private notesService: NotesService) {}

	ngOnInit() {
		this.notesService.selectedNote$.subscribe((note) => {
			if (note) {
				this.note = note;
				this.noteDate = `Created: ${getDetailedDate(note.date)}`;
				this.bodyTextarea.nativeElement.value = this.note.body;
				this.titleTextarea.nativeElement.value = this.note.title;
				this.titleTextarea.nativeElement.focus();
			} else {
				this.note = null;
				this.bodyTextarea.nativeElement.value = '';
				this.titleTextarea.nativeElement.value = '';
			}
		});
	}

	textInputHandler() {
		if (this.note) {
			this.notesService.noteInfo$.next({
				value: {
					body: this.bodyTextarea.nativeElement.value,
					title: this.titleTextarea.nativeElement.value,
				},
				note: this.note,
			});
		}
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
