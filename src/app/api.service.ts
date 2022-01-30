import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static TRACKMANIA_API_SERVER = "http://sowiemarkus.com:8080/"

  constructor(private httpClient: HttpClient) {
  }

  public getDailyResult() {
    let headers = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin:", "*");
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER + "cotd/2021/1/29", {headers: headers});
  }

  public getGlobalLeaderboard() {
    let headers = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin:", "*");
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER + "cotd/global", {headers: headers});
  }

  public getTrackOfTheDay(offset: number) {
    let headers = new HttpHeaders();
    headers.set("User-Agent", "trackmania-leaderboard-website by SoWieMarkus (Markus#2348) https://github.com/SoWieMarkus/TrackmaniaCOTDWebsite");
    return this.httpClient.get("https://trackmania.io/api/totd/" + offset, {headers: headers});
  }


}
