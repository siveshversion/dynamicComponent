import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoaderComponent,
  },
  {
    path: 'loader',
    component: LoaderComponent,
  },
  {
    path: 'dForm',
    component: DynamicFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
