import { Module } from '@nestjs/common';
import { FuelService } from './fuel.service';
import { FuelController } from './fuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './entities/fuel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fuel])],
  controllers: [FuelController],
  providers: [FuelService],
})
export class FuelModule {}
