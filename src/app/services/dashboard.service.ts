import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



const base_url = "https://dev-promart-ec-apps-demo.ue.r.appspot.com";


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }


    getHistory(search: string) {
        const data = {
            searchData: search
        }
        const url = `${base_url}/getHistory`;
        return this.http.post<any>(url, data);

    }

    getLastInsert() {

        const url = `${base_url}/getLastInsert`;
        return this.http.get<any>(url);

    }

}