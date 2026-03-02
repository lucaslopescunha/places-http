import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Place } from './places.model';
import { ErrorService } from './shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:8080/places',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:8080/user-places',
      'Something went wrong fetching your favorite places. Please try again later.')
      .pipe(
        tap({
          next: (userPlaces) => this.userPlaces.set(userPlaces)
        })
      );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    /** 
    this.userPlaces.update(prevPlaces => [...prevPlaces, place]);
    */
    return this.httpClient.put('http://localhost:8080/user-places', {
      placeId: place.id
    }).pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to store selected place.');
        return throwError(() => new Error('Failed to store selected place.'))
      })
    )
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter(p => p.id !== place.id));
    }

    return this.httpClient.delete('http://localhost:8080/user-places/' + place.id)
      .pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to remove the selected place.');
        return throwError(() => new Error('Failed to remove the selected place.'))
      })
    )
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<Place[]>(url)
      .pipe(catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(
            errorMessage
          )
        );
      }))
  }

}
