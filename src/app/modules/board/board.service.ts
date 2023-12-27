import { Injectable, Scope } from '@nestjs/common';
import { BoardRepository } from './board.repository';

@Injectable({ scope: Scope.REQUEST })
export class BoardService {
  constructor(private readonly _boardRepository: BoardRepository) {}

  getAll() {
    return this._boardRepository.getAll();
  }
}
