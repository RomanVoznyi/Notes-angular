import { Routes } from '@angular/router';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
	{ path: '', component: NotesListComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'user', component: UserComponent },
	{ path: '**', component: PageNotFoundComponent },
];
