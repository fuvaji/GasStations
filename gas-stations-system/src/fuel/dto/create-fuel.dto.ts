import { IsNotEmpty, IsString, IsDecimal } from "class-validator";
import { Decimal } from 'decimal.js';

export class CreateFuelDto {
    @IsString()
    @IsNotEmpty()
    Type: string;

    @IsString()
    @IsNotEmpty()
    Name: string;

    @IsDecimal()
    @IsNotEmpty()
    Price: Decimal;
}
