import { Component, OnInit } from '@angular/core';
import { finalize, map, mapTo, Subscription } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { ProfileStore } from '../../store';
import { Trip } from 'src/app/core/models/trip';
import { AppLoadingService, UploadFileService } from 'src/app/core/services';

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
  public showTripPopup = false;

  public trip!: Trip;

  private _subscription = new Subscription();
  public set subs(sub: Subscription) {
    this._subscription.add(sub);
  }

  constructor(
    private _profileService: ProfileService,
    private _profileStore: ProfileStore,
    private _appLoadingService: AppLoadingService,
    private _uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    this.resetTripData();

    this.subs = this._profileStore.showTripPopup$.subscribe(
      (data) => (this.showTripPopup = data)
    );

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

  public onAddNewTrip(event: any): void {
    event.preventDefault();

    this._appLoadingService.show();

    this._profileService
      .createTrip(this.trip)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe((trip) => this._profileStore.addNewTrip(trip));

    this.showTripPopup = false;
  }

  public onRemoveTrip(id: number): void {
    this._appLoadingService.show();

    this._profileService
      .removeTrip(id)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe(() => this._profileStore.removeTrip(id));
  }

  public onRemoveTripImage(): void {
    this.trip.image = '';
  }

  public resetTripData(): void {
    this.trip = {
      id: 0,
      name: '',
      location: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  public onPopupClose(): void {
    this._profileStore.setShowTripPopup(false);
    this.resetTripData();
  }

  public onFileSelect(event: any): void {
    this._appLoadingService.show();

    const files = [event.target.files['0']];
    this._uploadFileService
      .uploadImage(files)
      .pipe(
        map((data) => {
          const res = data as any;
          return res.body;
        }),
        finalize(() => this._appLoadingService.hide())
      )
      .subscribe((data) => {
        if (!data) return;
        this.trip.image = data.image;
      });
  }
}
