import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from '../../core/http.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm = this.fb.group({
    userEmail: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    organizationUrl: ['', Validators.required]
  });
  LoginSubscription$: Subscription;

  constructor(private fb: FormBuilder, public http: HttpService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  submitForm() {
    const payload = {
      email: (this.loginForm.get('userEmail')?.value).trim(),
      password: (this.loginForm.get('password')?.value).trim(),
      organizationUrl: (this.loginForm.get('organizationUrl')?.value).trim()
    }
    
    if(this.loginForm.valid) {
      this.LoginSubscription$ = this.http.userLogin(payload).subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.auth_token);
        this.http.navigateTo('organization-info');
        console.log(localStorage.getItem('token'));
        
      })
    }
    else {
      alert('Please enter complete user details.');
    }
    
  }

  ngOnDestroy(): void {
    this.LoginSubscription$?.unsubscribe();
  }

}
