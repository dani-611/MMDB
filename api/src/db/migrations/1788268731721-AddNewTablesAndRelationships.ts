import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewTablesAndRelationships1788268731721 implements MigrationInterface {
  name = 'AddNewTablesAndRelationships1788268731721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "people" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "photo_url" text, "biography" text, "gender" text, "birthdate" date, "place_of_birth" text, "known_for" text, CONSTRAINT "UQ_85c129d8247430387bf17c0b5cc" UNIQUE ("uuid"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "movie_genres" ("movie_id" integer NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_ec45eae1bc95d1461ad55713ffc" PRIMARY KEY ("movie_id", "genre_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_crew" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL, "job" text NOT NULL, CONSTRAINT "PK_6ce364160dc8ba4358fc888ee7e" PRIMARY KEY ("movie_id", "person_id", "job"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "movie_crew_movie_idx" ON "movie_crew" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie_id" integer NOT NULL, "user_id" integer NOT NULL, "rating" integer, "body" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f2ccc5d85d7f3393c7f975395f7" UNIQUE ("uuid"), CONSTRAINT "reviews_one_per_user_per_movie" UNIQUE ("movie_id", "user_id"), CONSTRAINT "reviews_rating_check" CHECK ("rating" BETWEEN 1 AND 10), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "reviews_movie_idx" ON "reviews" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_cast" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL, "character_name" text NOT NULL, "billing_order" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e6dcab321b8cdf2b51a45453109" PRIMARY KEY ("movie_id", "person_id", "character_name"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "movie_cast_person_idx" ON "movie_cast" ("person_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "awards" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "person_id" integer NOT NULL, "movie_id" integer, "year" integer NOT NULL, "body" text NOT NULL, "category" text NOT NULL, "result" text NOT NULL, CONSTRAINT "UQ_a3558755a55ddfe45df6fcd52a8" UNIQUE ("uuid"), CONSTRAINT "PK_bc3f6adc548ff46c76c03e06377" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`ALTER TABLE "movies" ADD "rating" numeric(3,1)`);
    await queryRunner.query(
      `ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_crew" ADD CONSTRAINT "movie_crew_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_crew" ADD CONSTRAINT "movie_crew_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "reviews_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" ADD CONSTRAINT "awards_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" ADD CONSTRAINT "awards_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "awards" DROP CONSTRAINT "awards_movie_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "awards" DROP CONSTRAINT "awards_person_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" DROP CONSTRAINT "movie_cast_person_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" DROP CONSTRAINT "movie_cast_movie_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "reviews_movie_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_crew" DROP CONSTRAINT "movie_crew_person_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_crew" DROP CONSTRAINT "movie_crew_movie_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres" DROP CONSTRAINT "movie_genres_genre_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres" DROP CONSTRAINT "movie_genres_movie_id_fkey"`,
    );
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "rating"`);
    await queryRunner.query(`DROP TABLE "awards"`);
    await queryRunner.query(`DROP INDEX "public"."movie_cast_person_idx"`);
    await queryRunner.query(`DROP TABLE "movie_cast"`);
    await queryRunner.query(`DROP INDEX "public"."reviews_movie_idx"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP INDEX "public"."movie_crew_movie_idx"`);
    await queryRunner.query(`DROP TABLE "movie_crew"`);
    await queryRunner.query(`DROP TABLE "movie_genres"`);
    await queryRunner.query(`DROP TABLE "people"`);
  }
}
