import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments';
import {
  AppLoadingService,
  AuthService,
  UploadFileService,
} from 'src/app/core/services';
import { map, finalize, filter } from 'rxjs';
import { TripDetailService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { TripDetail, TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public id = Number(this._route.snapshot.paramMap.get('id'));

  public map!: mapboxgl.Map;
  public geocoder!: MapboxGeocoder;
  public searchResult!: any;

  public userProfile!: User;
  public tripDetail!: TripDetail;

  public showPopupDetails = false;
  public selectedItem!: TripItem;
  public usersSharedItem!: (User & {
    numberOfLikes?: number;
    itemId?: number;
  })[];

  public userProfile$ = this._authService.userProfile$;

  constructor(
    private _appLoadingService: AppLoadingService,
    private _uploadFileService: UploadFileService,
    private _tripDetailService: TripDetailService,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._tripDetailService.getTripDetail(this.id).subscribe((data) => {
      this.tripDetail = data;

      setTimeout(() => {
        this._initMap();
        this._initAutoComplete();
        this._initItemMarkers();
      }, 0);
    });

    this.userProfile$.subscribe((data) => (this.userProfile = data));
  }

  private _initMap(): void {
    this._appLoadingService.show();

    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9?optimize=true',
      center: [108.08333, 16.08333],
      minZoom: 3,
    });

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'state-label',
        type: 'symbol',
        source: 'composite',
        'source-layer': 'place_label',
        filter: ['==', ['get', 'structure'], 'tunnel'],
      });

      this._appLoadingService.hide();
    });
  }

  private _initAutoComplete(): void {
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapboxKey,
      mapboxgl: mapboxgl as any,
      marker: true,
    });

    this.map.addControl(this.geocoder);

    this.geocoder.on('result', ({ result }) => (this.searchResult = result));
  }

  private _initItemMarkers(): void {
    const items = this.tripDetail.items?.map((item) => {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '60px',
      })
        .setText(item.ordinal.toString())
        .addTo(this.map);

      const marker = new mapboxgl.Marker()
        .setLngLat([item.lng, item.lat])
        .addTo(this.map)
        .setPopup(popup);

      return {
        ...item,
        marker,
      };
    });

    this.tripDetail = { ...this.tripDetail, items: items };
  }

  public onSelectItem(item: TripItem): void {
    this._appLoadingService.show();

    this._tripDetailService
      .usersSharedItem(item.id)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe((users) => {
        this.showPopupDetails = true;
        this.selectedItem = item;
        this.usersSharedItem = users.sort((previous, current) =>
          current.numberOfLikes > previous.numberOfLikes ? 1 : -1
        );
      });
  }

  public onAddNewItem(): void {
    this._appLoadingService.show();

    this._tripDetailService
      .addTripItem({
        trip: this.tripDetail.id,
        lng: this.searchResult.center[0],
        lat: this.searchResult.center[1],
        location: this.searchResult.place_name,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      })
      .pipe(
        finalize(() => {
          this._appLoadingService.hide();
          this.geocoder.clear();
        })
      )
      .subscribe((item) => {
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          maxWidth: '60px',
        })
          .setText(item.ordinal.toString())
          .addTo(this.map);

        const marker = new mapboxgl.Marker()
          .setLngLat(this.searchResult.center)
          .addTo(this.map)
          .setPopup(popup);

        this.tripDetail = {
          ...this.tripDetail,
          items: [...this.tripDetail.items, { ...item, marker }],
        };
      });
  }

  public onRemoveItem(item: TripItem): void {
    this._appLoadingService.show();

    this._tripDetailService
      .removeTripItem(this.tripDetail.id, item.id)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe(() => {
        const items = this.tripDetail.items.filter((data) => {
          if (data.id !== item.id) return true;

          data.marker?.remove();
          return false;
        });

        this.tripDetail = { ...this.tripDetail, items };
      });
  }

  public onSaveChanges(): void {
    this._appLoadingService.show();

    this._tripDetailService
      .updateTripDetails(this.tripDetail)
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe();
  }

  public onItemSaveChanges(item: TripItem): void {
    this.showPopupDetails = false;

    this._appLoadingService.show();

    this._tripDetailService
      .updateTripItem({
        id: item.id,
        trip: item.trip,
        lat: item.lat,
        lng: item.lng,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        note: item.note,
        image: item.image,
        description: item.description,
      })
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe(() => {
        const items = this.tripDetail.items.map((data) => {
          if (data.id === item.id) return item;
          return data;
        });

        this.tripDetail = {
          ...this.tripDetail,
          items: items,
        };
      });
  }

  public onItemShare(item: TripItem): void {
    this._tripDetailService.shareItem(item.id, item.isShared).subscribe(() => {
      const items = this.tripDetail.items.map((data) => {
        if (data.id !== item.id) return data;

        return item;
      });

      this.tripDetail = { ...this.tripDetail, items };
    });
  }

  public onItemLike(item: TripItem): void {
    this._tripDetailService.likeItem(item.id).subscribe(() => {
      const items = this.tripDetail.items.map((data) => {
        if (data.id !== item.id) return data;

        return item;
      });

      this.tripDetail = { ...this.tripDetail, items };
    });
  }

  public onFileSelect(event: any): void {
    this._appLoadingService.show();

    const files = [event.target.files['0']];
    this._uploadFileService
      .uploadImage(files)
      .pipe(
        map((data) => (data as any).body),
        filter((data) => !!data),
        finalize(() => this._appLoadingService.hide())
      )
      .subscribe((data) => (this.tripDetail.image = data.image));
  }

  public drop(event: CdkDragDrop<string[]> | any): void {
    const item = this.tripDetail.items[event.previousIndex];
    moveItemInArray(
      this.tripDetail.items,
      event.previousIndex,
      event.currentIndex
    );

    this._tripDetailService
      .updateItemOrdinal(item.id, event.currentIndex)
      .subscribe(() => {
        this.tripDetail.items.forEach((item, index) => {
          item.marker?.remove();
          item.ordinal = index;
        });

        this._initItemMarkers();
      });
  }
}
