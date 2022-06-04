import { Component, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { Trip } from 'src/app/core/models/trip';
import { ProfileService } from '../../services/profile.service';
import { ProfileStore } from '../../store';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  public trips$ = this._profileStore.trips$;
  public albums$ = this._profileStore.albums$;
  public isMyProfile$ = this._profileStore.isMyProfile$;

  public loading = true;

  private _subscription = new Subscription();
  public set subs(sub: Subscription) {
    this._subscription.add(sub);
  }

  constructor(
    private _profileService: ProfileService,
    private _profileStore: ProfileStore
  ) {}

  ngOnInit(): void {
    this.subs = this._profileStore.userProfile$.subscribe((userProfile) => {
      this._profileService
        .getUserTrips(userProfile?.id)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((trips) => this._profileStore.setTripsStore(trips));
    });
  }

  public onAlbumSelectionChanged(trip: Trip): void {
    this._profileService
      .updateAlbumSelection(trip)
      .subscribe(() => this._profileStore.updateTripStore(trip));
  }
}
