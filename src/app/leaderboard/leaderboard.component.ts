import {Component, Input, OnInit} from '@angular/core';
import {Leaderboard} from "../api/models/Leaderboard";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  @Input() leaderboard!: Leaderboard;

  constructor() {
  }

  ngOnInit(): void {
  }
}
