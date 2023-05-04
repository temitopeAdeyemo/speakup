import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1681978422282 implements MigrationInterface {
    name = 'Migrations1681978422282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_number" character varying NOT NULL, "bank" character varying NOT NULL, "bvn" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user" uuid, CONSTRAINT "UQ_4a8ef96d9f82940efc61221978f" UNIQUE ("id"), CONSTRAINT "UQ_a5b74acb5f9e1adfbf4cc813d9a" UNIQUE ("bvn"), CONSTRAINT "REL_1cc2dad2189dad3a7b4a6a7729" UNIQUE ("user"), CONSTRAINT "PK_4a8ef96d9f82940efc61221978f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account_info" ADD CONSTRAINT "FK_1cc2dad2189dad3a7b4a6a77297" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_info" DROP CONSTRAINT "FK_1cc2dad2189dad3a7b4a6a77297"`);
        await queryRunner.query(`DROP TABLE "account_info"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
