import Decimal from "decimal.js";
import { Dispenser } from "src/dispenser/entities/dispenser.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    OrderID: number;

    @ManyToOne(()=>Dispenser, dispenser=>dispenser.DispenserID)
    Dispenser: Dispenser;

    @Column({type: 'decimal'})
    Quantity: number;

    @Column({type: 'numeric', transformer:{
        to: (value: Decimal) => value.toString(),
    from: (value: string) => new Decimal(value)
    }})
    Price: Decimal;

    @Column({type: 'numeric', transformer:{
        to: (value: Decimal) => value.toString(),
    from: (value: string) => new Decimal(value)
    }})
    Amount: Decimal;

    @Column({type: 'timestamp without time zone'})
    Timestamp: Date;
}
