import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Board extends Model {
  @Column
  declare name: string;
}