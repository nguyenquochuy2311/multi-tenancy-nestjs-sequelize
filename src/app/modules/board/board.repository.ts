import { Repository } from '@core/abstract/repository.abstract';
import { CONNECTION } from '@core/helpers/database.helper';
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { IBoard } from './board.interface';
import { Board } from './board.model';

@Injectable()
export class BoardRepository extends Repository<IBoard> {
  constructor(@Inject(CONNECTION) connection: Sequelize) {
    super(Board, connection);
  }

  public getAll() {
    return super._getAll();
  }
}
