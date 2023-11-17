import { Injectable } from '@angular/core';
import { ITransferReq, ITransferRes } from '../models/transfer.model';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  transfers: ITransferRes[];

  constructor(private readonly platformService: PlatformService) {
    this.transfers = [
      {
        id: 1,
        platformName: 'MoviiRed',
        value: '$1.000.000',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
      {
        id: 2,
        platformName: 'Puntored',
        value: '$800.000',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
      {
        id: 3,
        platformName: 'TuLlave',
        value: '$300.000',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAvailable: true,
      },
    ];
  }

  register(req: ITransferReq): ITransferRes {
    const platformFound = this.platformService.getByName(req.platformName);
    const platformName = !platformFound ? '' : platformFound.name;

    const newTransfer: ITransferRes = {
      ...req,
      id: this.transfers.length,
      value: `$${req.value}`,
      platformName,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAvailable: true,
    };

    this.transfers.push(newTransfer);

    return newTransfer;
  }

  getAll(): ITransferRes[] {
    return this.transfers;
  }
}
