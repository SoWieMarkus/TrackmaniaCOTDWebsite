import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Leaderboard} from "../api/models/Leaderboard";
import {ApiService} from "../api/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {

  @ViewChild("previous") private previousRef!: ElementRef;
  @ViewChild("next") private nextRef!: ElementRef;

  leaderboard!: Leaderboard;

  month!: number;
  year!: number;

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.year = parseInt(params['year']);
      this.month = parseInt(params['month']);
      if (isNaN(this.year)) {
        this.year = new Date().getFullYear();
      }
      if (isNaN(this.month)) {
        this.month = new Date().getMonth() + 1;
      }

      this.search();
    });
  }



  public disabledNext(): boolean{
    let date = new Date(this.year, this.month, 1);
    date.setMonth(date.getMonth());
    return date > new Date();
  }

  public disabledPrevious(): boolean{
    let date = new Date(this.year, this.month, 1);
    date.setMonth(date.getMonth() - 2);
    return date.getFullYear() <= 2020 && date.getMonth() <= 9;
  }

  public nextMonthName():string {
    let date = new Date(this.year, this.month, 1);
    date.setMonth(date.getMonth());
    return  date.toLocaleString('default', { month: 'short' }).toUpperCase();
  }

  public currentMonthName():string {
    let date = new Date(this.year, this.month, 1);
    date.setMonth(date.getMonth() -1);
    return  date.toLocaleString('default', { month: 'long' }) + " " + this.year;
  }

  public previousMonthName(){
    let date = new Date(this.year, this.month, 1);
    date.setMonth(date.getMonth() - 2);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  }

  get nextButton(): HTMLButtonElement {
    return this.nextRef.nativeElement;
  }

  get previousButton(): HTMLButtonElement {
    return this.previousRef.nativeElement;
  }

  private search(): void {

    this.api.getMonthlyLeaderBoard(this.month, this.year).subscribe((data: Leaderboard) => {
      this.leaderboard = data;
    });
  }

  public getNextYear(direction:number): number {
    let nextMonth = this.month + direction;
    if (nextMonth === 13) return this.year + 1;
    if (nextMonth === 0) return this.year - 1;
    return this.year;
  }

  public getNextMonth(direction:number): number {
    let nextMonth = this.month + direction;
    if (nextMonth === 13) return 1;
    if (nextMonth === 0) return 12;
    return nextMonth;
  }

}
