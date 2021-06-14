import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { HappinessLevels } from '../constants/enums';

@Entity()
export class Measurement {
  constructor(measurement?: Measurement) {
    Object.assign(this, measurement);
  }

  @ObjectIdColumn() _id?: ObjectID;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Column()
  weight: number;

  @ApiProperty({ enum: HappinessLevels })
  happinessLevel: HappinessLevels;
}
