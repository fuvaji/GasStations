import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { FuelInStock } from 'src/fuel-in-stock/entities/fuel-in-stock.entity';
import { GasStation } from 'src/gas-station/entities/gas-station.entity';
import { Fuel } from 'src/fuel/entities/fuel.entity';

@Injectable()
export class DeliveryService {

  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    
    @InjectRepository(Fuel)
    private readonly fuelRepository: Repository<Fuel>,
    
    @InjectRepository(FuelInStock)
    private readonly fuelInStockRepository: Repository<FuelInStock>,

    @InjectRepository(GasStation)
    private readonly gasStationRepository: Repository<GasStation>
  ){}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const {StationID, FuelID, Quantity} = createDeliveryDto;

    const gasStation = await this.gasStationRepository.findOneBy({StationID});
    if(!gasStation)
      throw new NotFoundException(`There is no station with ${StationID}`);

    const fuel = await this.fuelRepository.findOneBy({FuelID})
    if(!fuel)
      throw new NotFoundException(`There is no fuel with ${FuelID}`);

    let fuelInStock = await this.fuelInStockRepository.findOne({
      where:{
        Fuel: {FuelID: FuelID},
        GasStation: {StationID: StationID}
      },
      relations: ['GasStation', 'Fuel']
    })

    if(!fuelInStock){
      fuelInStock = new FuelInStock();
      fuelInStock.GasStation = gasStation;
      fuelInStock.Fuel = fuel;
      fuelInStock.Quantity=Quantity;
    }
    else{
      fuelInStock.Quantity=+fuelInStock.Quantity + +Quantity;
    }

    const delivery = new Delivery()
    delivery.GasStation = gasStation;
    delivery.Fuel = fuel;
    delivery.Quantity = Quantity;
    delivery.Timestamp = new Date();

    await this.fuelInStockRepository.save(fuelInStock);
    return this.deliveryRepository.save(delivery);
    
  }

  findAll(): Promise<Delivery[]> {
    return this.deliveryRepository.find();
  }

  findOne(DeliveryID: number): Promise<Delivery> {
    return this.deliveryRepository.findOneBy({DeliveryID});
  }

  remove(DeliveryID: number) : Promise<{affected?: number}> {
    return this.deliveryRepository.delete(DeliveryID);
  }
}
