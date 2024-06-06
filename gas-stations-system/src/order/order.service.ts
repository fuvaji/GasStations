import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Dispenser } from 'src/dispenser/entities/dispenser.entity';
import { FuelInStock } from 'src/fuel-in-stock/entities/fuel-in-stock.entity';
import Decimal from 'decimal.js';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Dispenser)
    private readonly dispenserRepository: Repository<Dispenser>,
    
    @InjectRepository(FuelInStock)
    private readonly fuelInStockRepository: Repository<FuelInStock>,
  ){}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const {DispenserID, Quantity} = createOrderDto;

    const dispenser = await this.dispenserRepository.findOne({
      where: {DispenserID},
      relations: ['FuelInStock', 'FuelInStock.Fuel']
    });

    if(!dispenser)
      throw new NotFoundException(`There is no dispenser with ${DispenserID}`);

    if(+dispenser.FuelInStock.Quantity<+Quantity)
      {
      console.log(dispenser.FuelInStock.Quantity + "<" + Quantity);
        throw new UnprocessableEntityException(`There is not enough fuel in stock at ${DispenserID} to process request`);
      }
    let fuelInStock = dispenser.FuelInStock;
    fuelInStock.Quantity = +fuelInStock.Quantity - +Quantity;

    const order = new Order();
    order.Quantity = Quantity;
    order.Dispenser=dispenser;
    order.Price=new Decimal(dispenser.FuelInStock.Fuel.Price);
    order.Amount=new Decimal((+dispenser.FuelInStock.Fuel.Price* +Quantity).toFixed(2));
    order.Timestamp = new Date();

    await this.fuelInStockRepository.save(fuelInStock);
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(OrderID: number): Promise<Order> {
    return this.orderRepository.findOneBy({OrderID})
  }

  remove(OrderID: number) : Promise<{affected?: number}> {
    return this.orderRepository.delete(OrderID);
  }

  getAllStationOrders(StationID: number): Promise<Order[]>{
    return this.orderRepository.find({
      where: {
        Dispenser: {
          GasStation: {
            StationID: StationID
          }
        }
      },
      relations:[
        'Dispenser',
        'Dispenser.FuelInStock',
        'Dispenser.FuelInStock.Fuel'
      ]
    });
  }

  getAllDispenserOrders(DispenserID: number): Promise<Order[]>{
    return this.orderRepository.find({
      where: {
        Dispenser: {
          DispenserID: DispenserID
        }
      },
      relations:[
        'Dispenser',
        'Dispenser.FuelInStock',
        'Dispenser.FuelInStock.Fuel'
      ]
    });
  }
}
