import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GasStationModule } from './gas-station/gas-station.module';
import { FuelModule } from './fuel/fuel.module';
import { FuelInStockModule } from './fuel-in-stock/fuel-in-stock.module';
import { DispenserModule } from './dispenser/dispenser.module';
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '123',
      username: 'postgres',
      entities: [],
      database: 'GasStationsSystemDB',
      synchronize: true,
      logging: true,
    }),
    GasStationModule,
    FuelModule,
    FuelInStockModule,
    DispenserModule,
    OrderModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
