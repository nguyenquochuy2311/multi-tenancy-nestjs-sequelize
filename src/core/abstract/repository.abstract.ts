import { CONNECTION } from '@core/helpers/database.helper';
import { Inject } from '@nestjs/common';
import {
  BulkCreateOptions,
  CreateOptions,
  DestroyOptions,
  FindOptions,
  Identifier,
  UpdateOptions,
  UpsertOptions,
} from 'sequelize';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';

export abstract class Repository<I> {
  constructor(
    private readonly model: ModelCtor,
    @Inject(CONNECTION) private readonly connection: Sequelize,
  ) {}

  public getModel(model?: ModelCtor): ModelCtor {
    return model
      ? this.connection.model(model)
      : this.connection.model(this.model);
  }

  protected async _getAll(options: FindOptions = {}): Promise<I[]> {
    const result = await this.connection
      .getRepository(this.model)
      .findAll(options);

    return result?.map((d: Model): I => d.get({ plain: true }));
  }

  protected async _getByPk(
    pk: Identifier,
    options: FindOptions = {},
  ): Promise<I | null> {
    const result = await this.connection
      .getRepository(this.model)
      .findByPk(pk, options);

    return result?.get({ plain: true });
  }

  protected async _getOne(options: FindOptions = {}): Promise<I | null> {
    const result = await this.connection
      .getRepository(this.model)
      .findOne(options);

    return result?.get({ plain: true });
  }

  protected async _create(data: any, options: CreateOptions = {}): Promise<I> {
    const result = await this.connection
      .getRepository(this.model)
      .create(data, options);

    return result?.get({ plain: true });
  }

  protected async _bulkCreate(
    data: any[],
    options: BulkCreateOptions = {},
  ): Promise<I[]> {
    const result = await this.connection
      .getRepository(this.model)
      .bulkCreate(data, options);

    return result?.map((d: Model): I => d.get({ plain: true }));
  }

  protected _update(
    data: any,
    options: UpdateOptions = { where: {} },
  ): Promise<[affectedCount: number]> {
    return this.connection.getRepository(this.model).update(data, options);
  }

  protected async _upsert(data: any, options: UpsertOptions = {}): Promise<I> {
    const [result] = await this.connection
      .getRepository(this.model)
      .upsert(data, options);

    return result?.get({ plain: true });
  }

  protected _delete(options: DestroyOptions): Promise<number> {
    return this.connection.getRepository(this.model).destroy(options);
  }
}
