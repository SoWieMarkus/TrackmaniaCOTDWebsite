import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Element} from "@angular/compiler";

@Component({
  selector: 'app-daily-totd',
  templateUrl: './daily-totd.component.html',
  styleUrls: ['./daily-totd.component.css']
})
export class DailyTotdComponent implements OnInit, AfterViewInit {

  @Input() totd!: any;
  @Input() year!: number;
  @Input() month!: number;

  @ViewChild("name")
  private nameSpanRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  get nameSpan():HTMLDivElement {
    return this.nameSpanRef.nativeElement;
  }

  ngAfterViewInit(): void {

  }

}
