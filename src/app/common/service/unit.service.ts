import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from '../interfaces/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private unitsUrl = 'assets/data/units.json'; // Adjust path as per your project structure

  constructor(private http: HttpClient) {}

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.unitsUrl);
  }

  updateUnitPosition(unit: Unit, latOffset: number, lngOffset: number): void {
    unit.lat += latOffset;
    unit.lng += lngOffset;
  }
}
