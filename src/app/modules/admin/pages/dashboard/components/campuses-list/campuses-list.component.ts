import { Component, OnInit } from '@angular/core';
import { IDashboardResponse } from '@models/dashboard.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-campuses-list',
  templateUrl: './campuses-list.component.html',
  styleUrls: ['./campuses-list.component.css'],
})
export class CampusesListComponent implements OnInit {
  dashboard: IDashboardResponse | null = null;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getReport().subscribe((res) => (this.dashboard = res));
  }
}
