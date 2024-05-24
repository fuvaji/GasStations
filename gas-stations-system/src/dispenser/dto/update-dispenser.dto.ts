import { PartialType } from '@nestjs/mapped-types';
import { CreateDispenserDto } from './create-dispenser.dto';

export class UpdateDispenserDto extends PartialType(CreateDispenserDto) {}
