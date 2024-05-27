{}import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class GasStation{
    @PrimaryGeneratedColumn()
    StationID: number;

    @Column({type:'varchar'})
    Address: string;
}
