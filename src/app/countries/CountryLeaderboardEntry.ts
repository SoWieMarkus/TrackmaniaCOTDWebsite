import {PlayerResult} from "../api/models/PlayerResult";

export class CountryLeaderboardEntry {
  id!: string;
  points!:number;
  amountWins!:number;
  amountPlayers!:number;
  bestPlayer!:PlayerResult;
  flag!:string;
}
