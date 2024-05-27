import { IsNotEmpty, IsString } from "class-validator";

export class CreateGasStationDto {
    @IsString()
    @IsNotEmpty()
    Address: string;
}
