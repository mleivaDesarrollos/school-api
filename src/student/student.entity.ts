import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  firstName: string;

  @Column('nvarchar')
  lastName: string;
}
