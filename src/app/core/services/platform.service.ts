import { Injectable } from '@angular/core';
import { IPlatformReq, IPlatformRes } from '../models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private platforms: IPlatformRes[];

  constructor() {
    this.platforms = [
      {
        id: 1,
        name: 'MoviiRed',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
      {
        id: 2,
        name: 'Puntored',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
      {
        id: 3,
        name: 'ReFácil',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
      {
        id: 4,
        name: 'Recargas',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
      {
        id: 5,
        name: 'Venezuela',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
      {
        id: 6,
        name: 'Conred',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
    ];
  }

  register(req: IPlatformReq): IPlatformRes {
    const res = {
      ...req,
      id: this.platforms.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAvailable: true,
    };

    this.platforms.push(res);

    return res;
  }

  getAll(): IPlatformRes[] {
    return this.platforms;
  }

  getByName(platformName: string): IPlatformRes | undefined {
    return this.platforms.find((platform) => platform.name === platformName);
  }
}
