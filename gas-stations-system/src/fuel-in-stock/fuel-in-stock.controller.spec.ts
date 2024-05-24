import { Test, TestingModule } from '@nestjs/testing';
import { FuelInStockController } from './fuel-in-stock.controller';
import { FuelInStockService } from './fuel-in-stock.service';

describe('FuelInStockController', () => {
  let controller: FuelInStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelInStockController],
      providers: [FuelInStockService],
    }).compile();

    controller = module.get<FuelInStockController>(FuelInStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
