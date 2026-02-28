import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Place } from '../places.model';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css'
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    /**
     * Back to work with the response data.
     */
    const subscription = this.httpClient.get<Place[]>('http://localhost:8080/places')
      .pipe(catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(
            'Something went wrong fetching the available places. Try again later.'
          )
        );
      }))
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
}
