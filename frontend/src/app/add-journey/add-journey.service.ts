import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AddJourneyService {
  private header = new HttpHeaders().set('Content-Type', 'application/json');
  private addJourneyUrl : string = 'http://localhost:8000/travel/journeys/';

  constructor(private http : HttpClient) { }

  addJourney(journey,owner) {
    console.log("here");
    let body = JSON.stringify({
      journey_img: journey.journey,
      latitude: journey.latitude,
      longitude: journey.longitude,
      description: "first",
      owner: owner
    });
    console.log(body); 
    return this.http
           .post(this.addJourneyUrl, body, {headers: this.header,}); 
  }
}