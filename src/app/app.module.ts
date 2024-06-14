import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LeafletMapComponent } from './common/components/leaflet-map/leaflet-map.component';
import { UnitListComponent } from './common/components/unit-list/unit-list.component';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    UnitListComponent

  ],
  imports: [
    BrowserModule,
    LeafletModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
