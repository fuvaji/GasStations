import { Module } from '@nestjs/common';
import { GasStationService } from './gas-station.service';
import { GasStationController } from './gas-station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasStation } from './entities/gas-station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GasStation])],
  controllers: [GasStationController],
  providers: [GasStationService],
  exports: [TypeOrmModule]
})
export class GasStationModule {}
