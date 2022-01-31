import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Leaderboard} from "../api/models/Leaderboard";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  leaderboard!: Leaderboard;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getGlobalLeaderboard().subscribe((data: Leaderboard) => {
      this.leaderboard = data;
    });
  }

}
