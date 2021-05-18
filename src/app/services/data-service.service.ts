import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private gloabelDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv';
  constructor(private http : HttpClient) { }

  getGlobalData(){
    return this.http.get(this.gloabelDataUrl, {responseType : 'text'}).pipe(
      map(result => {
        
      }) 
    )
  }
}
