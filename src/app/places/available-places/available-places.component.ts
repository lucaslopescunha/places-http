import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css'
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    /**
     * Back to work with the response data.
     */
    const subscription = 
      this.placesService
      .loadAvailablePlaces()
      .subscribe({
        next: (resData) => {
          this.places.set(resData);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error: Error) => {
          this.error.set(error.message  );
        }
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    console.log('chamado')
    const subscription = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => console.log(resData)
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
