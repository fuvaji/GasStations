import { PartialType } from '@nestjs/mapped-types';
import { CreateFuelInStockDto } from './create-fuel-in-stock.dto';

export class UpdateFuelInStockDto extends PartialType(CreateFuelInStockDto) {}
