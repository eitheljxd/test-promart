import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



const base_url = "https://dev-promart-ec-apps-demo.ue.r.appspot.com";


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }


    getHistory() {

        const url = `${base_url}/getHistory`;
        return this.http.get<any>(url);

    }

    getLastInsert() {

        const url = `${base_url}/getLastInsert`;
        return this.http.get<any>(url);

    }

}