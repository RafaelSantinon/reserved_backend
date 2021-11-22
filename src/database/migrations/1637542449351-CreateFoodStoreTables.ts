import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFoodStoreTables1637542449351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'food-store-tables',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'idFoodStore',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'int4',
          },
          {
            name: 'seats',
            type: 'int4',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'createdBy',
            type: 'string',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedBy',
            type: 'string',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deletedBy',
            type: 'string',
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('food-store-tables');
  }
}
