import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ NavComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
