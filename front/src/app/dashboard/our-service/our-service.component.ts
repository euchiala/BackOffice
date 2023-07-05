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
  dataSource: any;
  currentItemID: String = "";

  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentItemID = this.activatedRoute.snapshot.params["id"];
    if (!!this.currentItemID) {
      this.frontContentService.getById(this.currentItemID).subscribe((item1) => {
        this.initFormUpdate(item1[0])
      });
    } else {
      this.initForm();
    }
  }
  initFormUpdate(object: any) {
    this.form = this.formBuilder.group({
      header: [object.header, Validators.required],
      text: [object.text, Validators.required],
    });
  }


  initForm() {
    this.form = this.formBuilder.group({
      header: [null, Validators.required],
      text: [null, Validators.required],

    });
  }


  onSub() {
    const formData = new FormData();

    formData.append(`header`, this.form.value.header);
    formData.append(`text`, this.form.value.text);
    formData.append(`reference`, 'service');

    if (!!this.currentItemID){
      this.frontContentService.update(this.currentItemID,formData).subscribe(
        (response) => {
          this.router.navigate(['/service']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.frontContentService.add(formData).subscribe(
      (response) => {
        this.router.navigate(['/service']);
      },
      (error) => {
        console.error(error);
      }
    );}
  }
}
