import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface JsonFormControls {
  label: string;
  key: string;
  type: string;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  drugValues: any = [{}];
  inputArr: string[] = [
    'text',
    'password',
    'email',
    'number',
    'search',
    'tel',
    'url',
  ];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams) {
        const src = '/assets/' + queryParams['drugType'] + '.json';
        this.http.get(src).subscribe((res) => this.handleFn(res));
      }
    });
  }

  dynamicForm = this.formBuilder.group({});

  ngOnInit(): void {}

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      console.log('control' + control.key);
      this.dynamicForm.addControl(
        control.key,
        this.formBuilder.control(control.key, Validators.required)
      );
    }
  }

  handleFn(res: Object): void {
    this.drugValues = res;
    if (this.drugValues.fields) {
      // console.log(JSON.stringify(res));
      this.createForm(this.drugValues.fields);
    }
  }

  onSubmit() {}
}
