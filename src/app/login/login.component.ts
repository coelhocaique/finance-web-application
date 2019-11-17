import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from 'app/_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  login() {
    this.loading = true
    if (this.form.valid) {
      this.authService.login(this.form.value.userName, this.form.value.password)
        .subscribe(
          data => {
            this.router.navigate(['']);
          },
          error => {
            this.alertService.error(error);
          });

    }
    this.formSubmitAttempt = true;
  }
}