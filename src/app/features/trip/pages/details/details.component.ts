import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments';
import * as mapboxgl from 'mapbox-gl';
import { TripItem } from '../../interfaces';
import { AppLoadingService, UploadFileService } from 'src/app/core/services';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { map, finalize } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public map!: mapboxgl.Map;
  public geocoder!: MapboxGeocoder;
  public searchResult!: any;

  public items: TripItem[] = [];

  public showPopupDetails = false;
  public selectedItem!: TripItem;

  constructor(
    private _appLoadingService: AppLoadingService,
    private _uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    this._appLoadingService.show();

    this._initMap();
    this._initAutoComplete();
  }

  private _initMap(): void {
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

  public addNewItem(): void {
    this.geocoder.clear();

    const marker = new mapboxgl.Marker()
      .setLngLat(this.searchResult.center)
      .addTo(this.map);

    this.items.push({
      marker: marker,
      name: this.searchResult.place_name,
    });
  }

  public removeItem(item: TripItem, index: number): void {
    item.marker.remove();
    this.items.splice(index, 1);
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
      });
  }

  public onItemSaveChanges(item: TripItem): void {
    this.showPopupDetails = false;

    this.items = this.items.map((data) => {
      if (data.name === item.name) return item;
      return data;
    });
  }
}
