import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteInfoComponent } from './note-info.component';

describe('NoteDetailComponent', () => {
	let component: NoteInfoComponent;
	let fixture: ComponentFixture<NoteInfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NoteInfoComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NoteInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
