import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/globalData';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private gloabelDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv';
  constructor(private http : HttpClient) { }

  getGlobalData(){
    return this.http.get(this.gloabelDataUrl, {responseType : 'text'}).pipe(
      map(result => {
        let data: GlobalDataSummary[] = [];
        
        //creating an object
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0,1); //remove first(header) row, coz it is undefined.

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/)
         
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp : GlobalDataSummary = raw[cs.country];
          
          if(temp){
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;

            raw[cs.country] = temp;
          }else{
            raw[cs.country] = cs;
          }                           
        })
        //console.log(raw);
        return <GlobalDataSummary[]>Object.values(raw);
      }) 
    )
  }
}
