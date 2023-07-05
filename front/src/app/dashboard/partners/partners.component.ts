import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})

export class PartnersComponent implements OnInit {
  form!: FormGroup;
  files!: FormArray;
  currentItemID: String = "";
  dataSource: any;

  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
    this.frontContentService.getByReference('partners').subscribe((items) => {
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

  initForm() {
    this.form = this.formBuilder.group({
      files: this.formBuilder.array([])
    });
    this.files = this.form.get('files') as FormArray;
  }

  onSubmit() {
    const formData = new FormData();
    const file = this.selectedFiles[0];
    formData.append('file', file);
    formData.append('reference', 'partners');
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