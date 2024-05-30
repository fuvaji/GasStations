import { IsDecimal, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateDeliveryDto {
    @IsInt()
    @IsNotEmpty()
    StationID: number;

    @IsInt()
    @IsNotEmpty()
    FuelID: number;

    @IsDecimal()
    @IsNotEmpty()
    @IsPositive()
    Quantity: number;
}
