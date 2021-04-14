import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Bucket } from 'src/app/core/models/bucket.model';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  displayedColumns: string[] = ['size', 'date', 'url'];


  /** Based on the screen size, switch from standard to one column per row */
  lastBucket: Bucket;
  listBucket: Bucket[];

  loading: boolean = true;
  constructor(private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService) {

  }
  ngOnInit(): void {
    this.getLastInsert();
    this.getHistory();


    this.loading = false;
  }
  getLastInsert() {
    this.dashboardService.getLastInsert()
      .subscribe((bucket: Bucket) => {
        this.lastBucket = bucket;
      })
  }
  getHistory() {
    this.dashboardService.getHistory()
      .subscribe((bucket: Bucket[]) => {
        this.listBucket = bucket;
      })
  }
  getFormat(date) {
    return moment(date).format('l') + " " + moment(date).format('LT');
  }
}
