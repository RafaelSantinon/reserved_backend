import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnStatusToMenu1637981928493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'menus',
      new TableColumn({
        name: 'status',
        type: 'int4',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('menus', 'status');
  }
}
