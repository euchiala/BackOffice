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
  dataSource: any;

  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      header: [null, Validators.required],
      text: [null, Validators.required],
      files: this.formBuilder.array([])
    });
    this.files = this.form.get('files') as FormArray;

    this.frontContentService.getByReference('slider').subscribe((items) => {
      for (let i = 0; i < Object.keys(items).length; i++) {
        items[i].file = 'http://localhost:3000/' + items[i].file.replace(/\\/g, '/');
      }
      this.dataSource = items;
    });
  }

  delete(id: String) {
    this.frontContentService.delete(id).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    const file = this.selectedFiles[0];
    formData.append('file', file);
    formData.append('header', this.form.value.header);
    formData.append('text', this.form.value.text);
    formData.append('reference', 'slider');

    this.frontContentService.add(formData).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectedFiles: File[] = [];

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      console.log(this.files.controls);

      this.selectedFiles[0] = file;
      this.files.controls[0].setValue(file.name); // Update the FormControl with the file name
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
