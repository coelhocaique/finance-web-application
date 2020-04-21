import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/debts', title: 'Debts',  icon:'money_off', class: '' },
    { path: '/incomes', title: 'Income',  icon:'attach_money', class: '' }
];

// { path: '/logout', title: 'Logout',  icon:'logout', class: ''}

export const SETTINGS_ROUTES: RouteInfo[] = [
    { path: '/debt-type', title: 'Debt Type',  icon:'build', class: ''},
    { path: '/debt-tag',   title: 'Debt Tags',  icon:'build', class: ''},
    { path: '/debt-threshold', title: 'Debt Threshold',  icon:'build', class: ''},
    { path: '/recurring-debt', title: 'Recurring Debt',  icon:'money_off', class: ''},
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  settingsItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.settingsItems = SETTINGS_ROUTES.filter(setting => setting)
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
