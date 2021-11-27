/* eslint-disable indent */
/* eslint-disable brace-style */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnStatusToMenuItens1637984797923
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'menu-itens',
      new TableColumn({
        name: 'status',
        type: 'int4',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('menu-itens', 'status');
  }
}
