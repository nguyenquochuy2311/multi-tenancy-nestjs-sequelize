import { Controller, Get, Scope } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller({
  path: 'board',
  scope: Scope.REQUEST,
})
export class BoardController {
  constructor(private readonly _boardService: BoardService) {}

  @Get()
  getAll() {
    return this._boardService.getAll();
  }
}
