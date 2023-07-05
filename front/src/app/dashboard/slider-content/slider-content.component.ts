import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontContentService } from '../../services/front-content.service';

@Component({
  selector: 'app-slider-content',
  templateUrl: './slider-content.component.html',
  styleUrls: ['./slider-content.component.scss']
})
export class SliderContentComponent implements OnInit {
  dataSource: any;

  constructor(
    private frontContentService: FrontContentService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
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

}