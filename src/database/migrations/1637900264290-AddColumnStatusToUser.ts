import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnStatusToUser1637900264290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'status',
        type: 'int4',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'status');
  }
}
