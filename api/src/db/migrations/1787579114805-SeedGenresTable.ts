import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedGenresTable1787579114805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO genres (id, name) VALUES
        (1, 'Science Fiction'), (2, 'Drama'), (3, 'Music'),
        (4, 'Thriller'), (5, 'Action'), (6, 'Adventure'),
        (7, 'Horror'), (8, 'Comedy'), (9, 'Animation'),
        (10, 'Fantasy'), (11, 'Romance'), (12, 'History'),
        (13, 'Mystery'), (14, 'Crime'), (15, 'Family'),
        (16, 'War'), (17, 'Documentary');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM genres WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17);
    `);
  }
}
