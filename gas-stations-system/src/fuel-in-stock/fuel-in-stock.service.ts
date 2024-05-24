import { Injectable } from '@nestjs/common';
import { CreateFuelInStockDto } from './dto/create-fuel-in-stock.dto';
import { UpdateFuelInStockDto } from './dto/update-fuel-in-stock.dto';

@Injectable()
export class FuelInStockService {
  create(createFuelInStockDto: CreateFuelInStockDto) {
    return 'This action adds a new fuelInStock';
  }

  findAll() {
    return `This action returns all fuelInStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuelInStock`;
  }

  update(id: number, updateFuelInStockDto: UpdateFuelInStockDto) {
    return `This action updates a #${id} fuelInStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuelInStock`;
  }
}
