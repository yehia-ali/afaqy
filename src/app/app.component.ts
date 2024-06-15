import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, marker, Marker, icon, Icon, Map } from 'leaflet';
import { Unit } from './common/interfaces/unit.model';
import { UnitService } from './common/service/unit.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filteredMarkers: Marker[] = [];
  searchTerm: string = '';
  map!: Map;
  units: Unit[] = [];
  markers: Marker[] = [];
  options = {
    zoom: 13,
    center: latLng(51.505, -0.09),
  };
  baseLayers = {
    OpenStreetMap: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OpenStreetMap' }),
    GoogleMaps: tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 18, attribution: 'Google Maps' })
  };
  customIcon: Icon = icon({
    iconUrl: 'assets/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'assets/marker-shadow.png',
    shadowSize: [41, 41]
  });

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
    this.unitService.getUnits().subscribe(
      units => {
        this.units = units;
        this.initMarkers();
        this.simulateRandomMovement();
      },
      error => {
        console.error('Error fetching units: ', error);
      }
    );
  }
  

  initMarkers(): void {
    this.markers = this.units.map(unit =>
      marker([unit.lat, unit.lng], {
        title: unit.name,
        icon: this.customIcon
      })
    );
    this.filteredMarkers = [...this.markers];
  }

  simulateRandomMovement(): void {
    setInterval(() => {
      this.units.forEach((unit, index) => {
        const latOffset = (Math.random() - 0.5) * 0.002;
        const lngOffset = (Math.random() - 0.5) * 0.002;
        this.unitService.updateUnitPosition(unit, latOffset, lngOffset);
        this.markers[index].setLatLng([unit.lat, unit.lng]);
      });

      this.filterMarkers();
    }, Math.random() * 3000 + 2000);
  }

  filterMarkers(): void {
    const searchTerm = this.searchTerm.toLowerCase().trim();
    this.filteredMarkers = this.markers.filter(marker => {
      const unit = this.units.find(u => u.name === marker.options.title);
      return unit && (unit.name.toLowerCase().includes(searchTerm) || unit.id.toString().includes(searchTerm));
    });

    this.markers.forEach(marker => {
      if (this.filteredMarkers.includes(marker)) {
        marker.setOpacity(1);
      } else {
        marker.setOpacity(0.2);
      }
    });

    this.adjustMapZoom();
  }

  adjustMapZoom(): void {
    if (this.map && this.filteredMarkers.length > 0) {
      const featureGroup = L.featureGroup(this.filteredMarkers as any);
      this.map.fitBounds(featureGroup.getBounds());
    } else {
      this.map.setView(this.options.center, this.options.zoom);
    }
  }

  onFilterChanged(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterMarkers();
  }

}
