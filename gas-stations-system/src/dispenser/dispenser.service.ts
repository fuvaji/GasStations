import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDispenserDto } from './dto/create-dispenser.dto';
import { UpdateDispenserDto } from './dto/update-dispenser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispenser } from './entities/dispenser.entity';
import { Repository } from 'typeorm';
import { FuelInStock } from 'src/fuel-in-stock/entities/fuel-in-stock.entity';
import { GasStation } from 'src/gas-station/entities/gas-station.entity';


@Injectable()
export class DispenserService {

  constructor(
    @InjectRepository(Dispenser)
    private readonly dispenserRepository: Repository<Dispenser>,

    @InjectRepository(FuelInStock)
    private readonly fuelInStockRepository: Repository<FuelInStock>,

    @InjectRepository(GasStation)
    private readonly gasStationRepository: Repository<GasStation>
  ){}

  async create(createDispenserDto: CreateDispenserDto): Promise<Dispenser> {
    const {StationID, StockID} = createDispenserDto;

    const gasStation = await this.gasStationRepository.findOneBy({StationID});
    if(!gasStation)
      throw new NotFoundException(`There is no station with ${StationID}`);

    const fuelInStock = await this.fuelInStockRepository.findOne({
      where: {StockID},
      relations: ['GasStation'],
    });
    if(!fuelInStock || fuelInStock.GasStation.StationID != StationID)
      throw new NotFoundException(`There is no fuel in stock at ${StationID} with ${StockID}`);

    const dispenser = new Dispenser();
    dispenser.FuelInStock = fuelInStock;
    dispenser.GasStation = gasStation;
    return this.dispenserRepository.save(dispenser);
  }

  findAll(): Promise<Dispenser[]> {
    return this.dispenserRepository.find();
  }

  findOne(DispenserID: number) : Promise<Dispenser> {
    return this.dispenserRepository.findOneBy({DispenserID});
  }

  async update(DispenserID: number, updateDispenserDto: UpdateDispenserDto) : Promise<Dispenser> {
    const {StationID, StockID} = updateDispenserDto;

    const gasStation = await this.gasStationRepository.findOneBy({StationID});
    if(!gasStation)
      throw new NotFoundException(`There is no station with ${StationID}`);

    const fuelInStock = await this.fuelInStockRepository.findOne({
      where: {StockID},
      relations: ['GasStation'],
    });
    if(!fuelInStock || fuelInStock.GasStation.StationID != StationID)
      throw new NotFoundException(`There is no fuel in stock at ${StationID} with ${StockID}`);

    const dispenser = new Dispenser();
    dispenser.FuelInStock = fuelInStock;
    dispenser.GasStation = gasStation;
    dispenser.DispenserID = DispenserID;
    return this.dispenserRepository.save(dispenser);
  }

  remove(DispenserID: number) : Promise<{affected?: number}> {
    return this.dispenserRepository.delete(DispenserID);
  }
}
