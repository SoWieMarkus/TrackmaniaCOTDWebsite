import {Component, Input, OnInit} from '@angular/core';
import {Country} from "./Country";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  @Input() country!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
