import { IsDecimal, IsInt, IsNotEmpty, IsPositive } from "class-validator";


export class CreateOrderDto {
    @IsInt()
    @IsNotEmpty()
    DispenserID: number;

    @IsDecimal()
    @IsNotEmpty()
    @IsPositive()
    Quantity: number;
}
