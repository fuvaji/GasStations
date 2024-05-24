import { PartialType } from '@nestjs/mapped-types';
import { CreateGasStationDto } from './create-gas-station.dto';

export class UpdateGasStationDto extends PartialType(CreateGasStationDto) {}
