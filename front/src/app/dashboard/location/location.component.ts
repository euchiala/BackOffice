import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  form!: FormGroup;
  currentItemID: string = '';
  location: SafeHtml = '';

  constructor(
    private frontContentService: FrontContentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.frontContentService.getByReference('location').subscribe((item) => {
      this.location = this.sanitizer.bypassSecurityTrustHtml(item[0].text);
      this.currentItemID = item[0].id;
      if (this.location !== '') {
        this.initFormLocation(item[0].text);
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

  initFormLocation(location: SafeHtml): void {
    this.form = new FormGroup({
      text: new FormControl(location, [Validators.required]),
    });
  }

  onSub(): void {
    const objectToSubmit = { ...this.form.value, reference: 'location' };
    if (!!this.currentItemID) {
      this.frontContentService.update(this.currentItemID, objectToSubmit).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.frontContentService.add(objectToSubmit).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
