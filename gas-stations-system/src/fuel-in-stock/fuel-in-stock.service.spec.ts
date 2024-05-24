import { Test, TestingModule } from '@nestjs/testing';
import { FuelInStockService } from './fuel-in-stock.service';

describe('FuelInStockService', () => {
  let service: FuelInStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelInStockService],
    }).compile();

    service = module.get<FuelInStockService>(FuelInStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
