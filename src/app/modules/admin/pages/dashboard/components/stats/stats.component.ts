import { Component, OnInit } from '@angular/core';
import { IPlatformDashboardResponse } from '@models/dashboard.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  platforms: IPlatformDashboardResponse[] | null = null;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService
      .getReport()
      .subscribe((res) => (this.platforms = res.platforms));
  }
}
