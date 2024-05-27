import { Injectable } from '@nestjs/common';
import { CreateGasStationDto } from './dto/create-gas-station.dto';
import { UpdateGasStationDto } from './dto/update-gas-station.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GasStation } from './entities/gas-station.entity';

@Injectable()
export class GasStationService {

  constructor(
    @InjectRepository(GasStation) private readonly gasStationRepository: Repository<GasStation>,
  ){}

  create(createGasStationDto: CreateGasStationDto): Promise<GasStation> {
    const gasStation: GasStation = new GasStation();
    gasStation.Address = createGasStationDto.Address;
    return this.gasStationRepository.save(gasStation);
  }

  findAll(): Promise<GasStation[]> {
    return this.gasStationRepository.find();
  }

  findOne(StationID: number): Promise<GasStation> {
    return this.gasStationRepository.findOneBy({StationID});
  }

  update(StationID: number, updateGasStationDto: UpdateGasStationDto): Promise<GasStation> {
    const gasStation: GasStation = new GasStation();
    gasStation.Address=updateGasStationDto.Address;
    gasStation.StationID = StationID;
    return this.gasStationRepository.save(gasStation);
  }

  remove(StationID: number): Promise<{ affected?: number }> {
    return this.gasStationRepository.delete(StationID);
  }
}
