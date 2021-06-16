import { ApiProperty } from '@nestjs/swagger';
import { HappinessLevels } from '../constants/enums';

export class CreateMeasurementDto {
  @ApiProperty()
  weight: number;

  @ApiProperty({ type: Date })
  trackingDate: Date;

  @ApiProperty({ enum: HappinessLevels })
  happinessLevel: HappinessLevels;
}
