import { Test, TestingModule } from '@nestjs/testing';
import { GasStationController } from './gas-station.controller';
import { GasStationService } from './gas-station.service';

describe('GasStationController', () => {
  let controller: GasStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GasStationController],
      providers: [GasStationService],
    }).compile();

    controller = module.get<GasStationController>(GasStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
