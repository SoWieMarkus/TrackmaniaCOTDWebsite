import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  totds: any = undefined;
  offset!: number;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.offset = params['offset'];
      if (isNaN(this.offset)) {
        this.offset = 0;
      }
    });

    this.api.getTrackOfTheDay(this.offset).subscribe((data: any)=>{
      console.log(data);
      this.totds = data;
      this.totds.days.reverse();
    });
  }





}
