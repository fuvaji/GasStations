import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Get('station/:id')
  @UseGuards(AuthGuard('jwt'))
  getAllStationOrders(@Param('id') id: string)
  {
    return this.orderService.getAllStationOrders(+id);
  }

  @Get('/dispenser/:id')
  @UseGuards(AuthGuard('jwt'))
  getAllDispenserOrders(@Param('id') id: string)
  {
    return this.orderService.getAllDispenserOrders(+id);
  }
}
