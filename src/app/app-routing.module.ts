import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DailyComponent} from "./daily/daily.component";
import {MonthlyComponent} from "./monthly/monthly.component";
import {GlobalComponent} from "./global/global.component";
import {GlobeComponent} from "./globe/globe.component";


const routes: Routes = [

  { path: '', redirectTo: 'daily', pathMatch: 'full'},
  { path: 'daily', component: DailyComponent },
  { path: 'monthly', component: MonthlyComponent },
  { path: 'global', component: GlobalComponent },
  { path: 'globe', component: GlobeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
