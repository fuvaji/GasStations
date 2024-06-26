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
import { GasStation } from './gas-station/entities/gas-station.entity';
import { Fuel } from './fuel/entities/fuel.entity';
import { FuelInStock } from './fuel-in-stock/entities/fuel-in-stock.entity';
import { Dispenser } from './dispenser/entities/dispenser.entity';
import { Delivery } from './delivery/entities/delivery.entity';
import { Order } from './order/entities/order.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '123',
      username: 'postgres',
      entities: [GasStation, Fuel, FuelInStock, Dispenser, Delivery, Order],
      database: 'GasStationsDB',
      synchronize: true,
      logging: true,
    }),
    GasStationModule,
    FuelModule,
    FuelInStockModule,
    DispenserModule,
    OrderModule,
    DeliveryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
