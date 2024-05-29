import { IsInt, IsNotEmpty } from "class-validator";

export class CreateDispenserDto {
    @IsInt()
    @IsNotEmpty()
    StationID: number;

    @IsInt()
    @IsNotEmpty()
    StockID: number;
}
