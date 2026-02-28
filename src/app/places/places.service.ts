import { Injectable, signal } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {}

  loadUserPlaces() {}

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {}


}
