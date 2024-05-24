import { Module } from '@nestjs/common';
import { GasStationService } from './gas-station.service';
import { GasStationController } from './gas-station.controller';

@Module({
  controllers: [GasStationController],
  providers: [GasStationService],
})
export class GasStationModule {}
