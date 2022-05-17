import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  formData: any = {};

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onSubmit(formData: any) {
    if (formData.drugType) {
      this.router.navigate(['dForm'], {
        queryParams: { drugType: formData.drugType },
      });
    } else {
      alert('Select any one drug type');
    }
  }
}
