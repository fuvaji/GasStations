import { Dispenser } from 'src/dispenser/entities/dispenser.entity';
import { FuelInStock } from 'src/fuel-in-stock/entities/fuel-in-stock.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class GasStation{
    @PrimaryGeneratedColumn()
    StationID: number;

    @Column({type:'varchar'})
    Address: string;

    @OneToMany(()=>FuelInStock, fuelInStock => fuelInStock.GasStation)
    FuelsInStock: FuelInStock[];

    @OneToMany(()=>Dispenser, dispenser=>dispenser.GasStation)
    Dispensers: Dispenser[];
}
