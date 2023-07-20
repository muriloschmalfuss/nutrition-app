import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsRoutingModule} from "./products-routing.module";
import { FormComponent } from './components/form/form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
