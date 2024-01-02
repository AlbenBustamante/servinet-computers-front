import { Component, OnInit } from '@angular/core';
import { CampusService } from 'src/app/core/services/campus.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private readonly campusService: CampusService) {}

  ngOnInit(): void {
    this.campusService.getPlatforms().subscribe();
  }
}
