import { FuelInStock } from "src/fuel-in-stock/entities/fuel-in-stock.entity";
import { GasStation } from "src/gas-station/entities/gas-station.entity";
import { Order } from "src/order/entities/order.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dispenser {
    @PrimaryGeneratedColumn()
    DispenserID: number;

    @ManyToOne(()=> GasStation, gasStation=>gasStation.StationID)
    GasStation: GasStation;

    @ManyToOne(()=>FuelInStock, fuelInStock=>fuelInStock.StockID)
    FuelInStock: FuelInStock;

    @OneToMany(()=>Order , order=>order.Dispenser)
    Orders: Order[];
}
