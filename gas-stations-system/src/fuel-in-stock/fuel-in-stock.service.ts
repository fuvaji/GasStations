import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuelInStockDto } from './dto/create-fuel-in-stock.dto';
import { UpdateFuelInStockDto } from './dto/update-fuel-in-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FuelInStock } from './entities/fuel-in-stock.entity';
import { Repository } from 'typeorm';
import { Fuel } from 'src/fuel/entities/fuel.entity';
import { GasStation } from 'src/gas-station/entities/gas-station.entity';

@Injectable()
export class FuelInStockService {

  constructor(
    @InjectRepository(FuelInStock)
    private readonly fuelInStockRepository: Repository<FuelInStock>,

    @InjectRepository(Fuel)
    private readonly fuelRepository: Repository<Fuel>,

    @InjectRepository(GasStation)
    private readonly gasStationRepository: Repository<GasStation>
  ){}

  async create(createFuelInStockDto: CreateFuelInStockDto) : Promise<FuelInStock> {
    const { StationID, FuelID, Quantity } = createFuelInStockDto;
    
    const gasStation = await this.gasStationRepository.findOneBy({StationID});
    if(!gasStation)
      throw new NotFoundException(`There is no station with ${StationID}`);
    
    const fuel = await this.fuelRepository.findOneBy({FuelID});
    if(!fuel)
      throw new NotFoundException(`There is no fuel with ${FuelID}`);

    const fuelInStock = new FuelInStock();
    fuelInStock.Quantity = Quantity;
    fuelInStock.Station = gasStation;
    fuelInStock.Fuel = fuel;

    return this.fuelInStockRepository.save(fuelInStock);
  }

  findAll() : Promise<FuelInStock[]> {
    return this.fuelInStockRepository.find();
  }

  findOne(StockID: number) : Promise<FuelInStock> {
    return this.fuelInStockRepository.findOneBy({StockID});
  }

  async update(StockID: number, updateFuelInStockDto: UpdateFuelInStockDto) : Promise<FuelInStock> {
    const { StationID, FuelID, Quantity } = updateFuelInStockDto;
    
    const gasStation = await this.gasStationRepository.findOneBy({StationID});
    if(!gasStation)
      throw new NotFoundException(`There is no station with ${StationID}`);
    
    const fuel = await this.fuelRepository.findOneBy({FuelID});
    if(!fuel)
      throw new NotFoundException(`There is no fuel with ${FuelID}`);

    const fuelInStock = new FuelInStock();
    fuelInStock.Quantity = Quantity;
    fuelInStock.Station = gasStation;
    fuelInStock.Fuel = fuel;
    fuelInStock.StockID = StockID;

    return this.fuelInStockRepository.save(fuelInStock);
  }

  remove(StockID: number) : Promise<{affected?: number}> {
    return this.fuelInStockRepository.delete(StockID);
  }
}
