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
  files!: FormArray;

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
      files: new FormArray([])
    });
    this.files = this.form.get('files') as FormArray;
    this.files.push(this.formBuilder.control(null));
  }

  addFileInput() {
    this.files.push(this.formBuilder.control(null));
  }

  removeFile(index: number) {
    this.files.removeAt(index);
  }

  onSub() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      const file = this.selectedFiles[i];
      console.log(file);
      formData.append(`file`, file);
      formData.append(`header`, this.form.value.header);
      formData.append(`text`, this.form.value.text);
      formData.append(`reference`, 'service');
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

  onFileSelected(event: Event, index : number = 0) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFiles[index] = file;
      this.files.controls[index].setValue(file.name); // Update the FormControl with the file name
    }
  }
}
