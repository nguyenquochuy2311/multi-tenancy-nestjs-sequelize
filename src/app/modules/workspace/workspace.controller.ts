import { Body, Controller, Post, Scope } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';

@Controller({
  path: 'workspace',
  scope: Scope.REQUEST,
})
export class WorkspaceController {
  constructor(private readonly _workspaceService: WorkspaceService) {}

  @Post('create')
  create(@Body() { id }) {
    return this._workspaceService.create(id);
  }
}
