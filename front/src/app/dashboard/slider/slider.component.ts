import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  form!: FormGroup;
  files!: FormArray;
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
      checkbox: Boolean(object.checkbox),
      files: this.formBuilder.array([]) 
    });
    this.files = this.form.get('files') as FormArray;
  }
  
  
  initForm() {
    this.form = this.formBuilder.group({
      header: [''],
      text: [''],
      checkbox: false,
      files: this.formBuilder.array([])
    });
    this.files = this.form.get('files') as FormArray;
  }
  
  onSubmit() {
    const formData = new FormData();
    const file = this.selectedFiles[0];
    formData.append('file', file);
    formData.append('header', this.form.value.header);
    formData.append('text', this.form.value.text);
    formData.append('checkbox', this.form.value.checkbox);
    formData.append('reference', 'slider');
    if (!!this.currentItemID){
      this.frontContentService.update(this.currentItemID,formData).subscribe(
        (response) => {
          this.router.navigate(['/slider']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.frontContentService.add(formData).subscribe(
      (response) => {
        this.router.navigate(['/slider']);
      },
      (error) => {
        console.error(error);
      }
    );}
  }

  selectedFiles: File[] = [];

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFiles[0] = file;
      if (this.files && this.files.controls.length > 0) {
        this.files.controls[0].setValue(file.name);
      }
    }
  }
  

  createFileFormGroup(): FormGroup {
    return this.formBuilder.group({
      file: null,
      text: '',
      textarea: '',
      checkbox: false
    });
  }

}