import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Place } from '../places.model';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";
import { HttpClient } from '@angular/common/http';

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

  ngOnInit(): void {
    /**
     * Back to work with the response data.
     */
    const subscription = this.httpClient.get<Place[]>('http://localhost:8080/places'
    )
      .subscribe({
        next: (resData) => {
          console.log(resData);
        }
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
