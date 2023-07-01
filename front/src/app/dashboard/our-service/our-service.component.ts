import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';

@Component({
  selector: 'app-our-service',
  templateUrl: './our-service.component.html',
  styleUrls: ['./our-service.component.scss']
})
export class OurServiceComponent {
  form!: FormGroup;
  dataSource :any;

  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      header: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
    this.frontContentService.getByReference('service').subscribe((items)=>{
      this.dataSource = items;
    });
  }


  onSub() {
    const formData = new FormData();

      formData.append(`header`, this.form.value.header);
      formData.append(`text`, this.form.value.text);
      formData.append(`reference`, 'service');

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
