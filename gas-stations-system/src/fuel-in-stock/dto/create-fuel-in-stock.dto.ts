import { IsDecimal, IsInt, IsNegative, IsNotEmpty, Min } from "class-validator";

export class CreateFuelInStockDto {
    @IsInt()
    @IsNotEmpty()
    StationID: number;

    @IsInt()
    @IsNotEmpty()
    FuelID: number;

    @IsDecimal()
    @IsNotEmpty()
    @Min(0)
    Quantity: number;
}
