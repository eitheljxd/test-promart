import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Bucket } from 'src/app/core/models/bucket.model';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  displayedColumns: string[] = ['size', 'date', 'url'];
  search: string = moment().format('DD/MM/YYYY');
  date = new FormControl(new Date());

  /** Based on the screen size, switch from standard to one column per row */
  lastBucket: Bucket;
  listBucket: Bucket[];
  hasData: boolean;


  loading: boolean = true;
  constructor(private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService) {

  }
  ngOnInit(): void {
    this.loading = true;
    this.getLastInsert();
    this.getHistory();

  }
  getLastInsert() {
    this.dashboardService.getLastInsert()
      .subscribe((bucket: Bucket) => {
        this.lastBucket = bucket;
      })
  }
  getHistory() {
    this.listBucket = [];
    this.loading = true;

    this.dashboardService.getHistory(this.search)
      .subscribe((bucket: Bucket[]) => {
        this.listBucket = bucket;
        this.loading = false;

        this.hasData = this.listBucket.length > 0 ? true : false;

      })
  }
  getFormat(date) {
    return moment(date).format('DD/MM/YYYY') + " " + moment(date).format('LT');
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.loading = true;

    this.search = moment(event.value).format('DD/MM/YYYY')
    this.getHistory();

  }
}
