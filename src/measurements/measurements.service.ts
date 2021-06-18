import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { Measurement } from './entities/measurement.entity';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: MongoRepository<
      Measurement & Document
    >,
  ) {}

  create({
    email,
    createMeasurementDto,
  }: {
    email: string;
    createMeasurementDto: CreateMeasurementDto;
  }) {
    const newMeasurement = new Measurement({
      ...createMeasurementDto,
      email,
    });
    return this.measurementRepository.save(newMeasurement);
  }

  findAll(email: string) {
    return this.measurementRepository.find({ email });
  }

  findOne({ _id, email }: { email: string; _id: string }) {
    return this.measurementRepository.findOne(_id, {
      where: {
        email,
      },
    });
  }

  async update({
    _id,
    email,
    updateMeasurementDto,
  }: {
    email: string;
    _id: string;
    updateMeasurementDto: UpdateMeasurementDto;
  }) {
    const old = await this.measurementRepository.findOne(_id, {
      where: {
        email,
      },
    });
    if (old) {
      const updated = new Measurement({
        ...old,
        ...updateMeasurementDto,
        _id: new ObjectID(_id),
      });
      return this.measurementRepository.save(updated);
    } else throw 'Not Found';
  }

  async remove({ _id, email }: { email: string; _id: string }) {
    if (
      await this.measurementRepository.findOne(_id, {
        where: { email },
      })
    )
      return this.measurementRepository.delete(_id);
    else throw 'Not Found';
  }
}
