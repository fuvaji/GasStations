import { Module } from '@nestjs/common';
import { FuelInStockService } from './fuel-in-stock.service';
import { FuelInStockController } from './fuel-in-stock.controller';

@Module({
  controllers: [FuelInStockController],
  providers: [FuelInStockService],
})
export class FuelInStockModule {}
