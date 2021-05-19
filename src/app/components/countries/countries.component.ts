import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/globalData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  data : GlobalDataSummary[] ;
  countries : string[] = []; //empty string array

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  constructor(private service : DataServiceService) { }

  ngOnInit(): void {

    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country);
      })
    })
  }

  updateValues(country: string)
  {
    console.log(country);
    this.data.forEach(cs =>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
      }
    })
  }
}
