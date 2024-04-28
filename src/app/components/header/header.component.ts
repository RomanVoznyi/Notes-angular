import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: true,
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatInputModule,
		MatFormFieldModule,
		CommonModule,
	],
})
export class HeaderComponent {
	searchOpen: boolean = false;

	@ViewChild('searchInput', { static: true })
	searchInput!: ElementRef;

	constructor(
		private notesService: NotesService,
		private router: Router,
	) {}

	searchHandler(inputEl: any) {
		this.notesService.searchHandler(inputEl.value);
	}

	toggleOpenSearchInput() {
		this.searchOpen = !this.searchOpen;
		this.searchOpen && setTimeout(() => this.searchInput.nativeElement.focus(), 0);
	}

	navigateToPersonPage() {
		this.router.navigate(['/user']);
	}

	handleLogout() {
		console.log('Logout');
	}
}
