import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unit } from '../../interfaces/unit.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  @Input() units: Unit[] = [];
  @Output() filterChanged = new EventEmitter<string>();
  filteredUnits: Unit[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.updateFilteredUnits();
  }

  ngOnChanges(): void {
    this.updateFilteredUnits();
  }

  updateFilteredUnits(): void {
    if (this.units && this.units.length > 0) {
      this.filteredUnits = this.units.filter(unit =>
        unit.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        unit.id.toString().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUnits = [];
    }
    console.log('filteredUnits', this.filteredUnits);
    this.filterChanged.emit(this.searchTerm);
  }

  filterUnits(): void {
    this.updateFilteredUnits();
  }
}
