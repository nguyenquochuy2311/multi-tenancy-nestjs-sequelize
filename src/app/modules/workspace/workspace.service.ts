import { CONFIG } from '@config/index';
import { connectDB } from '@core/helpers/database.helper';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import {
  createConnection,
  type Connection as _Connection,
} from 'mysql2/promise';

@Injectable({ scope: Scope.REQUEST })
export class WorkspaceService {
  async create(workspaceID: string) {
    let connection!: _Connection;

    try {
      connection = await createConnection({
        host: CONFIG.DB_HOST,
        port: CONFIG.DB_PORT,
        user: CONFIG.DB_USER,
        password: CONFIG.DB_PASSWORD,
      });

      connection.connect();

      const query = `CREATE DATABASE IF NOT EXISTS \`${CONFIG.DB_NAME}_${workspaceID}\`;`;

      const queryCreate: any[] = await connection.query(query);

      if (queryCreate[0]?.warningStatus)
        throw new BadRequestException('Create workspace failed');

      await connectDB(workspaceID);
    } catch (error) {
      throw error;
    } finally {
      connection && (await connection.end());
    }
  }
}
