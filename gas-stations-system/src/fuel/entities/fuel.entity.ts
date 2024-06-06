import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { Decimal } from 'decimal.js';
import { Delivery } from 'src/delivery/entities/delivery.entity';

@Entity()
export class Fuel {
    @PrimaryGeneratedColumn()
    FuelID: number;

    @Column({type: 'varchar'})
    Type: string;

    @Column({type: 'varchar'})
    Name: string;

    @Column({type: 'numeric', })
    Price: number;

    @OneToMany(() => Delivery, delivery => delivery.Fuel)
    Deliveries: Delivery[];
}
