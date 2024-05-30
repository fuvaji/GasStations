import { Fuel } from "src/fuel/entities/fuel.entity";
import { GasStation } from "src/gas-station/entities/gas-station.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delivery {
    @PrimaryGeneratedColumn()
    DeliveryID: number;

    @ManyToOne(()=>GasStation, gasStation=>gasStation.StationID)
    GasStation: GasStation;

    @ManyToOne(()=>Fuel, fuel=>fuel.FuelID)
    Fuel: Fuel;
    
    @Column({type: 'decimal'})
    Quantity: number;

    @Column({type: 'timestamp without time zone'})
    Timestamp: Date;

}
