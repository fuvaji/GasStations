import { Module } from '@nestjs/common';
import { FuelInStockService } from './fuel-in-stock.service';
import { FuelInStockController } from './fuel-in-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelInStock } from './entities/fuel-in-stock.entity';
import { FuelModule } from 'src/fuel/fuel.module';
import { GasStationModule } from 'src/gas-station/gas-station.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FuelInStock]),
    FuelModule,
    GasStationModule
  ],
  controllers: [FuelInStockController],
  providers: [FuelInStockService],
})
export class FuelInStockModule {}
