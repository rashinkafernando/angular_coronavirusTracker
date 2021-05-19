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
        let rows = result.split('\n');

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/)
          data.push({
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          })
        })

        console.log(data);
        return [];
      }) 
    )
  }
}
