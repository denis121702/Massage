import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent implements OnInit {

  public menuData: any[];
  /*  = [
    {
      name: 'Workspace',
      items: [
        {
          name: 'dashboard',
          route: 'dashboard',
          icon: 'dashboard'
        },
        {
          name: 'customers',
          route: 'customers',
          icon: 'border_color'
        }
      ]
    }, {
      name: 'Administration',
      items: [
        {
          name: 'Users',
          route: 'admin/users',
          icon: 'person'
        },
        {
          name: 'Logs',
          route: 'logs',
          icon: 'list'
        },
        {
          name: 'Users',
          route: 'users',
          icon: 'person'
        }
      ]
    }
  ];*/

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  onLogout() {
      this.authService.logout();
      this.authService.redirectLogoutUser();
  }

}
