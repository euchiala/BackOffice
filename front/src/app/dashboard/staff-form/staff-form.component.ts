import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent {

  constructor (private staffService:StaffService, private router:Router, private activatedRoute:ActivatedRoute){
    this.initForm();
  }
  form!: FormGroup;
  currentItemID:String="";

  initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email	: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required]),
      cin: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required])
    });
  }

  initFormStaff(staff :any):void{
    this.form = new FormGroup({
      firstName: new FormControl(staff.firstName, [Validators.required]),
      lastName: new FormControl(staff.lastName, [Validators.required]),
      email	: new FormControl(staff.email, [Validators.required]),
      phone: new FormControl(staff.phone, [Validators.required]),
      adress: new FormControl(staff.adress, [Validators.required]),
      cin: new FormControl(staff.cin, [Validators.required]),
      color: new FormControl(staff.color, [Validators.required])
    })
}

  ngOnInit(): void {
    this.currentItemID = this.activatedRoute.snapshot.params["id"];
    if(!!this.currentItemID){
      this.staffService.getById(this.currentItemID).subscribe((item1)=>{this.initFormStaff(item1)});
    }else{
      this.initForm();
    }
  }


  onSub(): void {
    const objectToSubmit = { ...this.form.value};
    if (!!this.currentItemID){
    this.staffService.update(this.currentItemID,objectToSubmit).subscribe(
      (response) => {
        this.router.navigate(['/staff']);
      },
      (error) => {
        console.error(error);
      }
    );
    } else {
      this.staffService.add(objectToSubmit).subscribe(
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

