import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  form!: FormGroup;
  about:any;
  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.frontContentService.getByReference('about').subscribe((item) => {
      this.about = item[0]
      if (this.about) {
        this.initFormLocation(this.about);
      } else {
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.form = new FormGroup({
      header: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
  }

  initFormLocation(about: any): void {
    this.form = new FormGroup({
      header: new FormControl(about.header, [Validators.required]),
      text: new FormControl(about.text, [Validators.required]),
    });
  }

  onSub() {
    const formData = new FormData();
    formData.append(`header`, this.form.value.header);
    formData.append(`text`, this.form.value.text);
    formData.append(`reference`, 'about');

    this.frontContentService.add(formData).subscribe(
      (response) => {
        window.location.reload()
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
