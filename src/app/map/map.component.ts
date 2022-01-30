import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {drawMap} from "./map"

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

    drawMap(this.backgroundColor);

  }






}
