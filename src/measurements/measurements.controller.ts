import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  create(@Body() createMeasurementDto: CreateMeasurementDto) {
    return this.measurementsService.create(createMeasurementDto);
  }

  @Get()
  findAll() {
    return this.measurementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measurementsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMeasurementDto: UpdateMeasurementDto,
  ) {
    try {
      return await this.measurementsService.update(id, updateMeasurementDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.measurementsService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
