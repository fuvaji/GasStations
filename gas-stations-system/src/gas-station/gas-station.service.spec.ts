import { Test, TestingModule } from '@nestjs/testing';
import { GasStationService } from './gas-station.service';

describe('GasStationService', () => {
  let service: GasStationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GasStationService],
    }).compile();

    service = module.get<GasStationService>(GasStationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
