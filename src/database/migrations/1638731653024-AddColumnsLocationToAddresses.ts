/* eslint-disable indent */
/* eslint-disable brace-style */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsLocationToAddresses1638731653024
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'addresses',
      new TableColumn({
        name: 'latitude',
        type: 'decimal',
        scale: 10,
        precision: 2,
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'addresses',
      new TableColumn({
        name: 'longitude',
        type: 'decimal',
        scale: 10,
        precision: 2,
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('addresses', 'latitude');
    await queryRunner.dropColumn('addresses', 'longitude');
  }
}
