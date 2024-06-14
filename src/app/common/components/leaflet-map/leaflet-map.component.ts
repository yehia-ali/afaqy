import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { latLng, tileLayer, marker, Marker, MapOptions, Layer,Map  } from 'leaflet';
@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  @Input() options: MapOptions = {
    zoom: 13,
    center: [51.505, -0.09]
  };
  @Input() markers: Marker[] = [];
  @Input() baseLayers: { [name: string]: Layer } = {};
  @Output() mapReady = new EventEmitter<Map>();

  constructor() { }

  ngOnInit(): void {
    if (!this.options.layers) {
      this.options.layers = [];
    }
    if (Object.keys(this.baseLayers).length > 0 && !this.options.layers.length) {
      const keys = Object.keys(this.baseLayers);
      this.options.layers.push(this.baseLayers[keys[0]]);
    }
  }
  onMapReady(map: Map): void {
    this.mapReady.emit(map);
  }

}
