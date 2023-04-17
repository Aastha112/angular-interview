import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from 'core/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {

  orgData: any = [];
  DataSubscription$: Subscription;

  constructor(public http: HttpService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    console.log(token);
  
    if(token) {
      this.getOrganizationData();
    }
    else {
      alert('Invalid token');
      this.logoutUser();
    }
    
  }

  getOrganizationData() {
    this.DataSubscription$ = this.http.getOrganizationData().subscribe((data: any) => {
      this.orgData = data.data;
    })
  }

  logoutUser() {
    localStorage.clear();
    this.http.navigateTo('');
  }

  ngOnDestroy(): void {
    this.DataSubscription$?.unsubscribe();
  }

}
