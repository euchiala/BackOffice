import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmtpService } from '../../services/smtp.service';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss']
})
export class TechComponent implements OnInit {
  form!: FormGroup;
  files!: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private smtpService: SmtpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      adress: [null, Validators.required],
      links: [null, Validators.required],
      cin: [null, Validators.required],
      files: this.formBuilder.array([])
    });
    this.files = this.form.get('files') as FormArray;
  }
  selectedFiles: File[] = [];
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFiles[0] = file;
      if (this.files && this.files.controls.length > 0) {
        this.files.controls[0].setValue(file.name);
      }
    }
  }

  onSub(): void {
    const formData = new FormData();
    const file = this.selectedFiles[0];
    formData.append('file',file,file.name);
    const objectToSubmit = { ...this.form.value, file: file };
    // formData.append('file', file);
    formData.append('firstName', this.form.value.firstName);
    formData.append('lastName', this.form.value.lastName);
    formData.append('email', this.form.value.email);
    formData.append('phone', this.form.value.phone);
    formData.append('links', this.form.value.links);
    formData.append('cin', this.form.value.links);
    
    this.smtpService.sendEmail(formData).subscribe(
      (response) => {
        // Success handling
      },
      (error) => {
        // Error handling
        console.error(error);
      }
    );
    window.location.reload();

  }
}
