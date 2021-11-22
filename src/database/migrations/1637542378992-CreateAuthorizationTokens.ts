import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line
export class CreateAuthorizationTokens1637542378992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'authorization-tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'idUser',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'int4',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'expiresIn',
            type: 'timestamp',
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
    await queryRunner.dropTable('authorization-tokens');
  }
}
