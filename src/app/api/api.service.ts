import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Leaderboard} from "./models/Leaderboard";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static TRACKMANIA_API_SERVER = "https://api.sowiemarkus.com/"

  constructor(private httpClient: HttpClient) {
  }

  public getDailyResult() {
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER + "cotd/2021/1/29");
  }

  public getGlobalLeaderboard(): Observable<Leaderboard> {
    // @ts-ignore
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER + "cotd/global");
  }

  public getTrackOfTheDay(offset: number) {
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER + "tmio/" + offset);
  }

  public getMonthlyLeaderBoard(month: number, year: number) {
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER+"cotd/" + year + "/" + month);
  }

  public getCountriesLeaderboard() {
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER+"cotd/countries");
  }

  public getCountryLeaderBoard(name: string) {
    return this.httpClient.get(ApiService.TRACKMANIA_API_SERVER+"cotd/country/" + name);
  }


}
