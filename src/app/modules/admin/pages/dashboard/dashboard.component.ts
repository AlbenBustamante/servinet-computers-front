import { Component, OnInit } from '@angular/core';
import { IRoute } from '@models/route.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  routes: IRoute[] = [
    { title: 'Admin', icon: 'home', route: '/admin' },
    { title: 'Panel de usuario' },
  ];

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser()?.subscribe();
  }
}
