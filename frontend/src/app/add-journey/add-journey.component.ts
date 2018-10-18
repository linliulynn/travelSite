import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddJourneyService } from './add-journey.service';
import { AlertService } from '../alert/alert.service';
import { LocationComponent } from '../location/location.component';
import { Journey } from '../models/journey';

@Component({
  selector: 'app-add-journey',
  templateUrl: './add-journey.component.html',
  styleUrls: ['./add-journey.component.css']
})
export class AddJourneyComponent implements AfterViewInit {
  addjourneyForm: FormGroup;
  loading = false;
  image: '';
  latitude: number;
  longitude: number;
  journey: Journey;

  @ViewChild(LocationComponent)
  private locationComponent: LocationComponent;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private addJonrneyService: AddJourneyService,
              private alertService: AlertService) {
    this.createForm();
  }

  ngAfterViewInit() {
    this.journey.latitude = this.locationComponent.latitude;
    this.journey.longitude = this.locationComponent.longitude;
  }

  createForm() {
    this.addjourneyForm = this.fb.group({
      journeyimg: null
    });
    this.journey = new Journey("",0,0,"");
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addjourneyForm.get('journeyimg').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result
        });
        this.image = reader.result;
        this.journey.journey = this.image;
      };
    }
  }

  clearFile() {
    this.addjourneyForm.get('journeyimg').setValue(null);
    this.image = '';
    this.fileInput.nativeElement.value = '';
  }

  onChangeLocation() {
    this.journey.latitude = this.locationComponent.latitude;
    this.journey.longitude = this.locationComponent.longitude;
    console.log(this.journey.latitude, this.journey.longitude);
  }

  onSubmit() {
    const owner = JSON.parse(localStorage.getItem('currentUser'));
    console.log(owner.id);
    this.loading = true;
    console.log(this.journey.latitude, this.journey.longitude); 
    this.addJonrneyService.addJourney(this.journey,owner.id).subscribe(
      data => {
      console.log(data);
      },
      error => {
      this.alertService.error('upload failed');
    });
  }

  handleEnterKeyPress(event) {
    const tagName = event.target.tagName.toLowerCase();
    if (tagName !== 'textarea') {
      return false;
    }
  }
}
