import { Component } from '@angular/core';
@Component({
	selector: 'my-app',
	templateUrl: 'app.component.html',
	moduleId: module.id
})
export class AppComponent {
	showHeading = true;
	heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];
	toggleHeading() {
		this.showHeading = !this.showHeading;
	}
}
