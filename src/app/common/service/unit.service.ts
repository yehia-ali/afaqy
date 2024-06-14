import { Injectable } from '@angular/core';
import { Unit } from '../interfaces/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private units: Unit[] = [
      { id: 1, name: 'Green', lat: 51.505, lng: -0.09 },
      { id: 2, name: 'Black', lat: 51.51, lng: -0.1 },
      { id: 3, name: 'Red', lat: 51.515, lng: -0.095 },
      { id: 4, name: 'Blue', lat: 51.52, lng: -0.1 },
      { id: 5, name: 'Yellow', lat: 51.505, lng: -0.1 },
      { id: 6, name: 'Orange', lat: 51.51, lng: -0.105 },
      { id: 7, name: 'Purple', lat: 51.515, lng: -0.1 },
      { id: 8, name: 'Cyan', lat: 51.52, lng: -0.105 },
      { id: 9, name: 'Magenta', lat: 51.505, lng: -0.105 },
      { id: 10, name: 'Black', lat: 51.51, lng: -0.11 }
  
  ];
  
  getUnits(): Unit[] {
    return this.units;
  }

  updateUnitPosition(unit: Unit, latOffset: number, lngOffset: number): void {
    unit.lat += latOffset;
    unit.lng += lngOffset;
  }

}
