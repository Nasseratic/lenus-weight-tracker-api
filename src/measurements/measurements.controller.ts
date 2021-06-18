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
  Req,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  create(@Body() createMeasurementDto: CreateMeasurementDto, @Req() { user }) {
    return this.measurementsService.create({
      email: user.email,
      createMeasurementDto,
    });
  }

  @Get()
  findAll(@Req() { user }) {
    return this.measurementsService.findAll(user.email);
  }

  @Get(':id')
  findOne(@Param('id') _id: string, @Req() { user }) {
    return this.measurementsService.findOne({ _id, email: user.email });
  }

  @Patch(':id')
  async update(
    @Param('id') _id: string,
    @Req() { user },
    @Body() updateMeasurementDto: UpdateMeasurementDto,
  ) {
    try {
      return await this.measurementsService.update({
        _id,
        email: user.email,
        updateMeasurementDto,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') _id: string, @Req() { user }) {
    try {
      return await this.measurementsService.remove({
        _id,
        email: user.email,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
