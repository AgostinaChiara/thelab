import { Column, Model, Table, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'ingredients', timestamps: false })
class Ingredient extends Model {
  @PrimaryKey
  @Column
  override id!: number;

  @Column
  name!: string;
}

export default Ingredient;
