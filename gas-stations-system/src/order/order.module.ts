import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DispenserModule } from 'src/dispenser/dispenser.module';
import { FuelInStockModule } from 'src/fuel-in-stock/fuel-in-stock.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),
    DispenserModule,
    FuelInStockModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
