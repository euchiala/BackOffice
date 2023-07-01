import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  form!: FormGroup;
  currentItemID: string = '';
  location = '';

  constructor(
    private frontContentService: FrontContentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.frontContentService.getByReference('location').subscribe((item) => {
      this.location = item[0].text
      if (this.location != '') {
        this.initFormLocation(this.location);
      } else {
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.form = new FormGroup({
      text: new FormControl(null, [Validators.required]),
    });
  }

  initFormLocation(location: any): void {
    this.form = new FormGroup({
      text: new FormControl(location, [Validators.required]),
    });
  }

  onSub(): void {
    const objectToSubmit = { ...this.form.value, reference: 'location' };
    if (!!this.currentItemID) {
      this.frontContentService.update(this.currentItemID, objectToSubmit).subscribe(
        (response) => {
          window.location.reload()
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.frontContentService.add(objectToSubmit).subscribe(
        (response) => {
          window.location.reload()
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
