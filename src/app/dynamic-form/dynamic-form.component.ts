import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  drugValues: any = [{}];
  inputArr: string[] = ['number'];
  jsonParam: any;
  showTables: boolean = false;
  submittedArr: any = [];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams) {
        const src = '/assets/' + queryParams['drugType'] + '.json';
        this.jsonParam = src;
        this.performJsonCall();
      }
    });
  }

  performJsonCall() {
    this.http.get(this.jsonParam).subscribe((res) => this.handleFn(res));
  }

  dynamicForm = this.formBuilder.group({});

  ngOnInit(): void {
    this.dynamicForm.invalid;
    this.performJsonCall();
  }

  createForm(controls: any[]) {
    for (const control of controls) {
      console.log('formcontrolControlName: ' + control.key);
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

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onSubmit() {
    if (this.dynamicForm.value) {
      const obtainedData = this.dynamicForm.value;
      this.submittedArr = Object.keys(obtainedData).map((k) => obtainedData[k]);
      this.showTables = true;
    }
  }
}
