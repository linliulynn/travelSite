import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Journeys } from '../models/journeys';


@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  public latitude: number[];
  public longitude: number[];
  public data: Object;
  public journeys: Journeys[] = [];

  journeyUrl = 'http://localhost:8000/travel/journeys.json';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJourneys();
  }

  getJourneys() {
    this.http.get(this.journeyUrl).subscribe((res) => {
      this.data = res;
      console.log(this.data);

      // loop through each object of your locations array
      // tslint:disable-next-line:forin
      for (const index in this.data) {
        const d = this.data[index];
        console.log(d);
        const journey = new Journeys(d['journey_img'], Number(d['latitude']),
          Number(d['longitude']), d['description'], Number(d['owner']));
        this.journeys.push(journey);
      }
    });
  }
}
