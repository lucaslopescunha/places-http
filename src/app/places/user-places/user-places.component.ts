import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
})
export class UserPlacesComponent implements OnInit {
  //places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = () => this.placesService.loadedUserPlaces();

  ngOnInit(): void {
    this.isFetching.set(true);
    /**
     * Back to work with the response data.
     */
    const subscription = 
      this.placesService.loadUserPlaces()
      .subscribe({
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

  onRemovePlace(selectedPlace: Place) {

    console.log('o chamado veio chamado')
    const subscription = this.placesService
    .removeUserPlace(selectedPlace)
    .subscribe({
      next: (resData) => {
        console.log("Retorno", resData)
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }

}
