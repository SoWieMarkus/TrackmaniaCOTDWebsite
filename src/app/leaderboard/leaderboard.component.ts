import {Component, Input, OnInit} from '@angular/core';
import {Leaderboard} from "../api/models/Leaderboard";
import {PlayerResult} from "../api/models/PlayerResult";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  @Input() leaderboard!: PlayerResult[];
  @Input() showNation: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}
