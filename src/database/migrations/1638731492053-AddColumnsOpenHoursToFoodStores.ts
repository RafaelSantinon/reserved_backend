/* eslint-disable indent */
/* eslint-disable brace-style */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsOpenHoursToFoodStores1638731492053
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'food-stores',
      new TableColumn({
        name: 'openHours',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('food-stores', 'openHours');
  }
}
