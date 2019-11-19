import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.logout()
  }

  logout() {
      this.authService.logout()
      this.router.navigate(['']);
  }

}
