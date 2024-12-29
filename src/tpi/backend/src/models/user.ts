import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, AllowNull, HasMany } from 'sequelize-typescript';
import Recipe from './recipe';

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  override id!: number;

  @Unique
  @AllowNull(false)
  @Column
  username!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @HasMany(() => Recipe)
  recipes!: Recipe[];
}