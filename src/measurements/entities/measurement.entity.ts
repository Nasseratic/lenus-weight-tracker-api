import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { HappinessLevels } from '../constants/enums';

@Entity()
export class Measurement {
  constructor(measurement: Measurement) {
    Object.assign(this, measurement);
  }

  @ObjectIdColumn() _id?: ObjectID;

  @Column()
  email: string;

  @ApiProperty()
  @Column()
  createdAt? = new Date();

  @ApiProperty()
  @Column()
  trackingDate?: Date = new Date();

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Column()
  weight: number;

  @ApiProperty({ enum: HappinessLevels })
  @Column()
  happinessLevel: HappinessLevels = HappinessLevels.NORMAL;
}
