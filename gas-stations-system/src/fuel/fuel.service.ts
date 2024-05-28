import { Injectable } from '@nestjs/common';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fuel } from './entities/fuel.entity';

@Injectable()
export class FuelService {

  constructor(
    @InjectRepository(Fuel) private readonly fuelRepository: Repository<Fuel>,
  ){}

  create(createFuelDto: CreateFuelDto) : Promise<Fuel> {
    const fuel: Fuel = new Fuel();
    fuel.Name = createFuelDto.Name;
    fuel.Type = createFuelDto.Type;
    fuel.Price = createFuelDto.Price;
    return this.fuelRepository.save(fuel);
  }

  findAll() : Promise<Fuel[]> {
    return this.fuelRepository.find();
  }

  findOne(FuelID: number) : Promise<Fuel> {
    return this.fuelRepository.findOneBy({FuelID});
  }

  update(FuelID: number, updateFuelDto: UpdateFuelDto) : Promise<Fuel> {
    const fuel: Fuel = new Fuel();
    fuel.Name = updateFuelDto.Name;
    fuel.Type = updateFuelDto.Type;
    fuel.Price = updateFuelDto.Price;
    fuel.FuelID = FuelID;
    return this.fuelRepository.save(fuel);
  }

  remove(FuelID: number) : Promise<{affected?: number}> {
    return this.fuelRepository.delete(FuelID);
  }
}
