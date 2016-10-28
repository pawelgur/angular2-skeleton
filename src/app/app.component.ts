import { Component } from '@angular/core';

// import '../styles.css';

@Component({
	selector: 'my-app',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	showHeading = true;
	heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];

	toggleHeading() {
		this.showHeading = !this.showHeading;
	}
}