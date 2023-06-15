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

  constructor(
    private frontContentService: FrontContentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentItemID = this.activatedRoute.snapshot.params['id'];
    if (!!this.currentItemID) {
      this.frontContentService.getById(this.currentItemID).subscribe((item1) => {
        this.initFormStaff(item1);
      });
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      text: new FormControl(null, [Validators.required]),
    });
  }

  initFormStaff(location: any): void {
    this.form = new FormGroup({
      text: new FormControl(location.location, [Validators.required]),
    });
  }

  onSub(): void {
    const objectToSubmit = { ...this.form.value, reference:'location' };
    if (!!this.currentItemID) {
      this.frontContentService.update(this.currentItemID, objectToSubmit).subscribe(
        (response) => {
          this.router.navigate(['/staff']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.frontContentService.add(objectToSubmit).subscribe(
        (response) => {
          this.router.navigate(['/staff']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
