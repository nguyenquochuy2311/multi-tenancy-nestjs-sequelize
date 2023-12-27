import { Board } from '@app/modules/board/board.model';
import { CONFIG } from '@config/index';
import { Sequelize } from 'sequelize-typescript';

export const CONNECTION = {} as const;

export async function connectDB(
  workspaceID: string = CONFIG.DB_NAME,
): Promise<Sequelize> {
  const DB_NAME =
    workspaceID === CONFIG.DB_NAME
      ? CONFIG.DB_NAME
      : `${CONFIG.DB_NAME}_${workspaceID}`;

  if (CONNECTION[DB_NAME]) return CONNECTION[DB_NAME];

  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: CONFIG.DB_HOST,
    port: CONFIG.DB_PORT,
    username: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    database: DB_NAME,
    repositoryMode: true,
  });

  sequelize.addModels([Board]);

  await sequelize.sync();

  CONNECTION[DB_NAME] = sequelize;

  return CONNECTION[DB_NAME];
}
