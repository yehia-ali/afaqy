import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  searchTerm = '';

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>; 

  ngOnInit(): void {
    this.filteredUnits = this.units;
    this.focusSearchInput();
  }

  filterUnits(): void {
    this.filteredUnits = this.units.filter(unit =>
      unit.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      unit.id.toString().includes(this.searchTerm.toLowerCase()) 
    );
    this.filterChanged.emit(this.searchTerm);
  }

  focusSearchInput(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }

}
