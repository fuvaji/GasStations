import { Dispenser } from 'src/dispenser/entities/dispenser.entity';
import { Fuel } from 'src/fuel/entities/fuel.entity';
import { GasStation } from 'src/gas-station/entities/gas-station.entity';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm'

@Entity()   
export class FuelInStock {
    @PrimaryGeneratedColumn()
    StockID: number;

    @ManyToOne(()=> GasStation, gasStation=>gasStation.StationID)
    GasStation: GasStation;

    @ManyToOne(()=> Fuel, fuel=>fuel.FuelID)
    Fuel: Fuel;

    @Column({type: 'decimal'})
    Quantity: number;

    @OneToMany(()=>Dispenser, dispenser=>dispenser.FuelInStock)
    Dispensers: Dispenser[];
}
