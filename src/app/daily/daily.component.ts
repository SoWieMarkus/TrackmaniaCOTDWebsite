import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";


@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  cotd: any = undefined;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getDailyResult().subscribe((data: any)=>{
      console.log(data);
      this.cotd = data;
    });
  }





}
