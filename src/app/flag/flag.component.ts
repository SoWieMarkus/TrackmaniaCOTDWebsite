import {Component, Input, OnInit} from '@angular/core';
import {TrackmaniaZone} from "../api/models/TrackmaniaZone";

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  @Input() zone!: string;
  zoneObject!: TrackmaniaZone;

  constructor() {

  }

  ngOnInit(): void {
    this.zoneObject = new TrackmaniaZone(JSON.parse(this.zone));
  }

  get url():string {
    return "LOL"
  }
}
