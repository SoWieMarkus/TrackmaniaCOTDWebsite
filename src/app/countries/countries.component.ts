import {Component, OnInit, ViewChild} from '@angular/core';
import zones from "../../assets/countries_as_list.json"
import {Country} from "../country/Country";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries:Country[] = zones;

  @ViewChild("map")
  private map!: MapComponent;

  constructor() { }

  ngOnInit(): void {
  }

  public clickEvent(country: Country) {
    this.map.focus(country);
  }

}
