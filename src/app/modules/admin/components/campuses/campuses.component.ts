import { Component, OnInit } from '@angular/core';
import { IDashboardResponse } from 'src/app/core/models/dashboard.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-campuses',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.css'],
})
export class CampusesComponent implements OnInit {
  dashboard: IDashboardResponse | null = null;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getReport().subscribe((res) => (this.dashboard = res));
  }
}
