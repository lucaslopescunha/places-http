import { Component } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-user-places',
  imports: [PlacesContainerComponent],
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
})
export class UserPlacesComponent {

}
