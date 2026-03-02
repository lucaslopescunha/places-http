import { Component, inject } from '@angular/core';
import { AvailablePlacesComponent } from "./places/available-places/available-places.component";
import { ErrorService } from './places/shared/error.service';
import { ErrorModalComponent } from './places/shared/modal/error-modal/error-modal.component';
import { UserPlacesComponent } from "./places/user-places/user-places.component";

@Component({
  selector: 'app-root',
  imports: [AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private errorService = inject(ErrorService);
  error = this.errorService.error;

}
