import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material/material.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreateComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
