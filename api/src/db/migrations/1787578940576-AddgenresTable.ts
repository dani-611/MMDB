import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddgenresTable1787578940576 implements MigrationInterface {
  name = 'AddgenresTable1787578940576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "UQ_272b7fc583ad5d3e95f7f3cacae" UNIQUE ("uuid"), CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "genres"`);
  }
}
