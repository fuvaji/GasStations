import { Module } from '@nestjs/common';
import { DispenserService } from './dispenser.service';
import { DispenserController } from './dispenser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispenser } from './entities/dispenser.entity';
import { GasStationModule } from 'src/gas-station/gas-station.module';
import { FuelInStockModule } from 'src/fuel-in-stock/fuel-in-stock.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Dispenser]),
    GasStationModule,
    FuelInStockModule
  ],
  controllers: [DispenserController],
  providers: [DispenserService],
})
export class DispenserModule {}
