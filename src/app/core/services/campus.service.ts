import { Injectable } from '@angular/core';
import { ICampusReq, ICampusRes } from '../models/campus.model';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class CampusService {
  private readonly campuses: ICampusRes[] = [];

  constructor(private readonly platformService: PlatformService) {
    this.campuses.push({
      numeral: 1,
      address: 'Cra. 15 #70 - 79 Norte',
      cellphone: '310 310 1010',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAvailable: true,
      id: 1,
      platforms: [],
      terminal: '154213',
    });
  }

  register(req: ICampusReq): ICampusRes {
    const res: ICampusRes = {
      ...req,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: this.campuses.length + 1,
      isAvailable: true,
      platforms: [],
    };

    this.campuses.push(res);

    return res;
  }

  getAll() {
    return this.campuses;
  }

  addPlatform(campusId: number, platformName: string) {
    const platform = this.platformService.getByName(platformName);

    if (!platform) {
      return alert('Plataforma no encontrada');
    }

    this.campuses[campusId].platforms.push(platform);

    return this.campuses[campusId];
  }

  removePlatform(campusId: number, platformName: string) {
    const platform = this.platformService.getByName(platformName);

    if (!platform) {
      return alert('Plataforma no encontrada');
    }

    this.campuses[campusId].platforms.splice(platform.id - 1, 1);

    return this.campuses[campusId];
  }
}
