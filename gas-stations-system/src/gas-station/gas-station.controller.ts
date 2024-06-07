import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GasStationService } from './gas-station.service';
import { CreateGasStationDto } from './dto/create-gas-station.dto';
import { UpdateGasStationDto } from './dto/update-gas-station.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('gas-station')
export class GasStationController {
  constructor(private readonly gasStationService: GasStationService) {}

  @Post()
  create(@Body() createGasStationDto: CreateGasStationDto) {
    return this.gasStationService.create(createGasStationDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.gasStationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gasStationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGasStationDto: UpdateGasStationDto) {
    return this.gasStationService.update(+id, updateGasStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gasStationService.remove(+id);
  }
}
