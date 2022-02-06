import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {drawMap, drawGlobe, focus} from "./map"
import {Country} from "../country/Country";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  @Input() private backgroundColor: string = "#1f1f1f";

  private static SVG_ID: string = "map_svg";

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    drawGlobe();

  }

  public focus(country:string) {
    focus(country);
  }






}
