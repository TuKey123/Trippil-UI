import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments';
import { AppLoadingService, UploadFileService } from 'src/app/core/services';
import { map, finalize, filter } from 'rxjs';
import { TripDetailService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { TripDetail, TripItem } from 'src/app/core/models/trip';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public map!: mapboxgl.Map;
  public geocoder!: MapboxGeocoder;
  public searchResult!: any;

  public showPopupDetails = false;
  public selectedItem!: TripItem;

  public id = Number(this._route.snapshot.paramMap.get('id'));

  public tripDetail!: TripDetail;

  constructor(
    private _appLoadingService: AppLoadingService,
    private _uploadFileService: UploadFileService,
    private _tripDetailService: TripDetailService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this._initMap();
    // this._initAutoComplete();

    this._tripDetailService.getTripDetail(this.id).subscribe((data) => {
      this.tripDetail = data;

      // this._initItemMarkers();
    });
  }

  private _initMap(): void {
    this._appLoadingService.show();

    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9?optimize=true',
      center: [108.08333, 16.08333],
      zoom: 8,
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
    const items = this.tripDetail.items?.map((item) => ({
      ...item,
      marker: new mapboxgl.Marker()
        .setLngLat([item.lat, item.lng])
        .addTo(this.map),
    }));

    this.tripDetail = { ...this.tripDetail, items: items };
  }

  public onAddNewItem(): void {
    this._appLoadingService.show();

    this._tripDetailService
      .addTripItem({
        trip: this.tripDetail.id,
        lat: this.searchResult.center[0],
        lng: this.searchResult.center[1],
        location: this.searchResult.place_name,
        image: '',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      })
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe((item) => {
        this.geocoder.clear();

        const marker = new mapboxgl.Marker()
          .setLngLat(this.searchResult.center)
          .addTo(this.map);

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

    // this.items = this.items.map((data) => {
    //   if (data.name === item.name) return item;
    //   return data;
    // });
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
}
