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
     * If you want to access the response object.
     */
    const subscription = this.httpClient.get<Place[]>('http://localhost:8080/places',

      {
        observe: 'response'
      }
    )
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log(response.body);
        }
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
