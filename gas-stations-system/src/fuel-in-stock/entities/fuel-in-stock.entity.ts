import Decimal from 'decimal.js';
import { Fuel } from 'src/fuel/entities/fuel.entity';
import { GasStation } from 'src/gas-station/entities/gas-station.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm'

@Entity()   
export class FuelInStock {
    @PrimaryGeneratedColumn()
    StockID: number;

    @ManyToOne(()=> GasStation, station=>station.StationID, {eager: true})
    Station: GasStation;

    @ManyToOne(()=> Fuel, fuel=>fuel.FuelID, {eager: true})
    Fuel: Fuel;

    @Column({type: 'decimal'})
    Quantity: number;
}
