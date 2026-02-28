import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailablePlacesComponent } from "./places/available-places/available-places.component";
import { UserPlacesComponent } from "./places/user-places/user-places.component";

@Component({
  selector: 'app-root',
  imports: [AvailablePlacesComponent, UserPlacesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('places-http');
}
