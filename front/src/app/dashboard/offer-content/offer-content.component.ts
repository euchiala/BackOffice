import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';
@Component({
  selector: 'app-offer-content',
  templateUrl: './offer-content.component.html',
  styleUrls: ['./offer-content.component.scss']
})
export class OfferContentComponent implements OnInit {
  form!: FormGroup;
  dataSource: any;

  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  
  delete(id: string) {
    this.frontContentService.delete(id).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  ngOnInit() {
    this.frontContentService.getByReference('offer').subscribe((items) => {
      this.dataSource = items;
    });
  }
}
