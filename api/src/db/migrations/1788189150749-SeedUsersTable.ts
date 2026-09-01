import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsersTable1788189150749 implements MigrationInterface {
  name = 'SeedUsersTable1788189150749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "users" ("id", "email", "display_name", "password_hash") VALUES
            (1, 'mira.ibrahim.1@example.com', 'Mira Ibrahim', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (2, 'hugo.brennan.2@example.com', 'Hugo Brennan', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (3, 'tariq.andersson.3@example.com', 'Tariq Andersson', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (4, 'rafael.costa.4@example.com', 'Rafael Costa', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (5, 'milos.petrov.5@example.com', 'Milos Petrov', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (6, 'dmitri.yamamoto.6@example.com', 'Dmitri Yamamoto', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (7, 'mira.moreau.7@example.com', 'Mira Moreau', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (8, 'dmitri.dubois.8@example.com', 'Dmitri Dubois', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (9, 'mira.ibrahim.9@example.com', 'Mira Ibrahim', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (10, 'bruno.oyelowo.10@example.com', 'Bruno Oyelowo', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (11, 'mei.delgado.11@example.com', 'Mei Delgado', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (12, 'greta.kowalski.12@example.com', 'Greta Kowalski', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (13, 'greta.marchetti.13@example.com', 'Greta Marchetti', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (14, 'kofi.nakamura.14@example.com', 'Kofi Nakamura', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (15, 'amara.novak.15@example.com', 'Amara Novak', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (16, 'hassan.ferreira.16@example.com', 'Hassan Ferreira', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (17, 'yara.dubois.17@example.com', 'Yara Dubois', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (18, 'elias.moreau.18@example.com', 'Elias Moreau', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (19, 'bruno.ferreira.19@example.com', 'Bruno Ferreira', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (20, 'rosa.petrov.20@example.com', 'Rosa Petrov', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (21, 'ingrid.nasser.21@example.com', 'Ingrid Nasser', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (22, 'leila.sandoval.22@example.com', 'Leila Sandoval', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (23, 'yara.rahman.23@example.com', 'Yara Rahman', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (24, 'priya.andersson.24@example.com', 'Priya Andersson', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (25, 'yuki.nasser.25@example.com', 'Yuki Nasser', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (26, 'casper.adeyemi.26@example.com', 'Casper Adeyemi', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (27, 'kwame.okafor.27@example.com', 'Kwame Okafor', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (28, 'kofi.haddad.28@example.com', 'Kofi Haddad', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (29, 'hassan.andersson.29@example.com', 'Hassan Andersson', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (30, 'rafael.mbeki.30@example.com', 'Rafael Mbeki', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (31, 'noor.bergstrom.31@example.com', 'Noor Bergstrom', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (32, 'bruno.marchetti.32@example.com', 'Bruno Marchetti', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (33, 'solveig.sandoval.33@example.com', 'Solveig Sandoval', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (34, 'viktor.castellanos.34@example.com', 'Viktor Castellanos', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (35, 'idris.volkov.35@example.com', 'Idris Volkov', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (36, 'viktor.silva.36@example.com', 'Viktor Silva', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (37, 'lena.lindqvist.37@example.com', 'Lena Lindqvist', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (38, 'greta.dubois.38@example.com', 'Greta Dubois', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (39, 'camille.nasser.39@example.com', 'Camille Nasser', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (40, 'freya.sandoval.40@example.com', 'Freya Sandoval', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (41, 'oskar.petrov.41@example.com', 'Oskar Petrov', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (42, 'rosa.fischer.42@example.com', 'Rosa Fischer', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (43, 'idris.marchetti.43@example.com', 'Idris Marchetti', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
            (44, 'nadia.volkov.44@example.com', 'Nadia Volkov', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
        `);

    await queryRunner.query(`
            SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            TRUNCATE TABLE "users" RESTART IDENTITY;
        `);
  }
}
