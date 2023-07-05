import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent {

  constructor(private formBuilder: FormBuilder, private staffService: StaffService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.initForm();
  }
  form!: FormGroup;
  files!: FormArray;
  currentItemID: String = "";

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      adress: [null, Validators.required],
      links: [null, Validators.required],
      cin: [null, Validators.required],
      color: [null, Validators.required],
      files: this.formBuilder.array([])
    });
    this.files = this.form.get('files') as FormArray;
  }

  initFormStaff(staff: any): void {
    this.form = this.formBuilder.group({
      firstName: [staff.firstName, Validators.required],
      lastName: [staff.lastName, Validators.required],
      email: [staff.email, Validators.required],
      phone: [staff.phone, Validators.required],
      adress: [staff.adress, Validators.required],
      links: [staff.links, Validators.required],
      cin: [staff.cin, Validators.required],
      color: [staff.color, Validators.required],
      files: this.formBuilder.array([])
    });
    this.files = this.form.get('files') as FormArray;

  }

  ngOnInit(): void {
    this.currentItemID = this.activatedRoute.snapshot.params["id"];
    if (!!this.currentItemID) {
      this.staffService.getById(this.currentItemID).subscribe((item1) => { this.initFormStaff(item1) });
    } else {
      this.initForm();
    }
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

  onSub(): void {
    const formData = new FormData();
    const file = this.selectedFiles[0];
    formData.append('file', file);
    formData.append('firstName', this.form.value.firstName);
    formData.append('lastName', this.form.value.lastName);
    formData.append('email', this.form.value.email);
    formData.append('phone', this.form.value.phone);
    formData.append('adress', this.form.value.adress);
    formData.append('links', this.form.value.links);
    formData.append('cin', this.form.value.cin);
    formData.append('color', this.form.value.color);

    if (!!this.currentItemID) {
      this.staffService.update(this.currentItemID, formData).subscribe(
        (response) => {
          this.router.navigate(['/staff']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.staffService.add(formData).subscribe(
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

