import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelInStockService } from './fuel-in-stock.service';
import { CreateFuelInStockDto } from './dto/create-fuel-in-stock.dto';
import { UpdateFuelInStockDto } from './dto/update-fuel-in-stock.dto';

@Controller('fuel-in-stock')
export class FuelInStockController {
  constructor(private readonly fuelInStockService: FuelInStockService) {}

  @Post()
  create(@Body() createFuelInStockDto: CreateFuelInStockDto) {
    return this.fuelInStockService.create(createFuelInStockDto);
  }

  @Get()
  findAll() {
    return this.fuelInStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelInStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuelInStockDto: UpdateFuelInStockDto) {
    return this.fuelInStockService.update(+id, updateFuelInStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelInStockService.remove(+id);
  }
}
