import { Injectable } from '@nestjs/common';
import { CreateGasStationDto } from './dto/create-gas-station.dto';
import { UpdateGasStationDto } from './dto/update-gas-station.dto';

@Injectable()
export class GasStationService {
  create(createGasStationDto: CreateGasStationDto) {
    return 'This action adds a new gasStation';
  }

  findAll() {
    return `This action returns all gasStation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gasStation`;
  }

  update(id: number, updateGasStationDto: UpdateGasStationDto) {
    return `This action updates a #${id} gasStation`;
  }

  remove(id: number) {
    return `This action removes a #${id} gasStation`;
  }
}
