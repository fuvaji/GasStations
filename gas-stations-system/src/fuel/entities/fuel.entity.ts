import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import { Decimal } from 'decimal.js';

@Entity()
export class Fuel {
    @PrimaryGeneratedColumn()
    FuelID: number;

    @Column({type: 'varchar'})
    Type: string;

    @Column({type: 'varchar'})
    Name: string;

    @Column({type: 'decimal', transformer:{
        to: (value: Decimal) => value.toString(),
        from: (value: string) => new Decimal(value)
    }})
    Price: Decimal;
}
