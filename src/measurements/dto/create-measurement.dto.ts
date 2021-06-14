import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Column } from 'typeorm';
import { HappinessLevels } from '../constants/enums';

export class CreateMeasurementDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Column()
  weight: number;

  @ApiProperty({ enum: HappinessLevels })
  happinessLevel: HappinessLevels;
}
