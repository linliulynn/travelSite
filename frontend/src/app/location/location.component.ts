import { Component, OnInit, ElementRef, NgZone, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;

  @Output() onChangeLocation = new EventEmitter();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.latitude = 0;
    this.longitude = 0;

    //create search FormControl
    this.searchControl = new FormControl;

    //set current position
    this.setCurrentPosition();

    //load places autocomplete
    this.mapsAPILoader.load().then(()=> {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry == undefined || place.geometry == null) {
            return;
          }

          //set latitude, longitude
          this.latitude = Number(place.geometry.location.lat().toFixed(6));
          this.longitude = Number(place.geometry.location.lng().toFixed(6));
          
          console.log(this.latitude, this.longitude);

          this.onChangeLocation.emit();         
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      })
    }
  }
}
