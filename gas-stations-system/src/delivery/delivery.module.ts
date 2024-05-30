import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { GasStationModule } from 'src/gas-station/gas-station.module';
import { FuelModule } from 'src/fuel/fuel.module';
import { FuelInStockModule } from 'src/fuel-in-stock/fuel-in-stock.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Delivery]),
    GasStationModule,
    FuelModule,
    FuelInStockModule
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [TypeOrmModule]
})
export class DeliveryModule {}
