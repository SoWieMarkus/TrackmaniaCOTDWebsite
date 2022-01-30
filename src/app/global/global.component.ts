import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  private leaderboard!: Object;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getGlobalLeaderboard().subscribe((data: any) => {
      console.log(data);
      this.leaderboard = data;
    });
  }

}
