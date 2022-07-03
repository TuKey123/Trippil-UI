import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, finalize, Subscription } from 'rxjs';
import { ExploreService } from '../../service/explore.service';
import { ExploreStore } from '../../store/explore.store';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit, OnDestroy {
  public searchTerm$ = this._exploreStore.searchTerm$;
  public trips$ = this._exploreStore.trips$;

  private _subscription = new Subscription();
  public set subs(value: Subscription) {
    this._subscription.add(value);
  }

  public loading = false;

  constructor(
    private _exploreStore: ExploreStore,
    private _exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this._exploreStore.setDefaultData();

    this.subs = this.searchTerm$
      .pipe(debounceTime(300))
      .subscribe((searchTerm) => {
        this.loading = true;

        this._exploreService
          .getTrips(searchTerm)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe((trips) => this._exploreStore.setTripsStore(trips));
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onTripLike(tripId: number): void {
    this._exploreService.likeTrip(tripId).subscribe();
  }
}
