import {Component, OnInit, ViewChild} from '@angular/core';
import {Country} from "../country/Country";
import {MapComponent} from "../map/map.component";
import {ApiService} from "../api/api.service";
import {Leaderboard} from "../api/models/Leaderboard";
import {CountryLeaderboardEntry} from "./CountryLeaderboardEntry";
import {PlayerResult} from "../api/models/PlayerResult";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries:CountryLeaderboardEntry[] = [];
  country:PlayerResult[] = [];
  flag!:string;
  name!:string;

  @ViewChild("map")
  private map!: MapComponent;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCountriesLeaderboard().subscribe((data: CountryLeaderboardEntry[]) => {
      this.countries = data;
    });

  }

  public clickEvent(country: CountryLeaderboardEntry) {
    this.name = country.id;
    this.flag = country.flag;
    this.country.length = 0;
    this.api.getCountryLeaderBoard(country.id).subscribe((data: PlayerResult[]) => {
      this.country = data;
      this.map.focus(country.id);
    });
  }

}
