import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptionsClass } from './httpOptions';
import { Mixin } from './mixin';
import { Router } from '@angular/router';

@Mixin([HttpOptionsClass])
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = '';
  organizationData: any = [];
  getHttpOptions: ((options?: any) => any) | undefined;

  constructor(public http: HttpClient, public router: Router) { 
    this.url = ' http://122.170.12.63:90/api/';
  }

  navigateTo(page: any) {
    this.router.navigate([page]);
  }

  userLogin(payload: any) {
    const url = this.url + 'auth/login';
    return this.http.post(url, payload);
  }

  getOrganizationData() {
    const url = this.url + 'Organization/getAllOrganization';
    return this.http.get(url, this.getHttpOptions({token: true}));
  }

  addOrganizationData(payload: any) {
    const url = this.url + 'Organization/addOrganization';
    return this.http.post(url, payload);
  }

}
