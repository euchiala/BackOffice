import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from './../services/front-content.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  form!: FormGroup;
  files!: FormArray;

  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      files: this.formBuilder.array([])
    });
    this.files = this.form.get('files') as FormArray;
  }

  addFileInput() {
    this.files.push(this.formBuilder.control(null));
  }

  removeFile(index: number) {
    this.files.removeAt(index);
  }

  onSubmit() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      const file = this.selectedFiles[i];
      formData.append(`file`, file);
      formData.append(`reference`, 'slider');
    }
    this.frontContentService.add(formData).subscribe(
      (response) => {
        this.router.navigate(['/staff']);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  selectedFiles: File[] = [];

  onFileSelected(event: Event, index: number) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFiles[index] = file;
      this.files.controls[index].setValue(file.name); // Update the FormControl with the file name
    }
  }
}
