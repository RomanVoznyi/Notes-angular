import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { INote } from '../../../models/interfaces';
import { NotesService } from '../../../services/notes.service';
import { Subject } from 'rxjs';
import { getShortDate } from '../../../services/utils';

@Component({
	selector: 'app-note-card',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './note-card.component.html',
	styleUrl: './note-card.component.scss',
})
export class NoteCardComponent implements OnInit, OnDestroy {
	@Input() note: INote | undefined;
	@Output('noteClicked') noteClicked = new EventEmitter();
	private onDestroy$: Subject<void> = new Subject();
	isSelected: boolean = false;
	noteDate: string = '';

	constructor(private notesService: NotesService) {}

	ngOnInit() {
		this.notesService.selectedNote$.subscribe((selectedNote: INote | null) => {
			if (!selectedNote || (this.note && selectedNote.id !== this.note.id)) {
				this.isSelected = false;
			} else {
				this.isSelected = true;
			}
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['note'] !== undefined && changes['note'].currentValue !== undefined) {
			this.isSelected = !!(
				this.notesService.selectedNote &&
				this.note &&
				this.notesService.selectedNote.id === this.note.id
			);
			this.noteDate = getShortDate(this.note?.date);
		}
	}

	noteClickHandler() {
		this.noteClicked.emit();
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
