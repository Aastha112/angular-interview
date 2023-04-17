import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from '../../core/http.service';

@Component({
  selector: 'app-add-detail-page',
  templateUrl: './add-detail-page.component.html',
  styleUrls: ['./add-detail-page.component.scss']
})
export class AddDetailPageComponent implements OnInit, OnDestroy {

  validPattern = /^[A-Za-z]+$/;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  organizationForm = this.fb.group({
    organizationName: ['', [Validators.required, Validators.maxLength(100)]],
    organizationShortName: ['', [Validators.required, Validators.maxLength(50)]],
    organizationURL: ['', [Validators.pattern(this.urlRegex)]],
    organizationLOGO: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(this.validPattern)]],
  });
  OrganizationSubscription$: Subscription;

  constructor(private fb: FormBuilder, public http: HttpService) {}

  ngOnInit(): void {
    
  }

  addOrganizationData() {
    const payload = {
      organizationName: (this.organizationForm.get('organizationName')?.value).trim(),
      organizationShortName: (this.organizationForm.get('organizationShortName')?.value).trim(),
      organizationURL: (this.organizationForm.get('organizationURL')?.value).trim(),
      organizationLOGO: (this.organizationForm.get('organizationLOGO')?.value).trim()
    }
    if(this.organizationForm.valid) {
      this.OrganizationSubscription$ = this.http.addOrganizationData(payload).subscribe((res: any) => {
        alert('Your data has been saved.');
        this.clearOrganizationData();
      })
    }
    else {
      alert('Please enter valid data.');
    }
    
  }

  clearOrganizationData() {
    this.organizationForm?.reset();
  }

  ngOnDestroy(): void {
    this.OrganizationSubscription$?.unsubscribe();
  }

}
