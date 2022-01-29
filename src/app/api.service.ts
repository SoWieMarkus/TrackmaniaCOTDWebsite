import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static TRACKMANIA_API_SERVER = "http://sowiemarkus.com:8080/"

  constructor(private httpClient: HttpClient) { }

  public getDailyResult(){
    let headers = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin:", "*");
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER + "cotd/2021/1/29", {headers: headers});
  }

}
