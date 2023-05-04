import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1682406509876 implements MigrationInterface {
    name = 'Migrations1682406509876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bvn_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "account_info" DROP CONSTRAINT "FK_1cc2dad2189dad3a7b4a6a77297"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "account_info" ADD CONSTRAINT "UQ_4a8ef96d9f82940efc61221978f" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "account_info" ADD CONSTRAINT "FK_1cc2dad2189dad3a7b4a6a77297" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_info" DROP CONSTRAINT "FK_1cc2dad2189dad3a7b4a6a77297"`);
        await queryRunner.query(`ALTER TABLE "account_info" DROP CONSTRAINT "UQ_4a8ef96d9f82940efc61221978f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "account_info" ADD CONSTRAINT "FK_1cc2dad2189dad3a7b4a6a77297" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bvn_verified"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_verified"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number_verified"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_01eea41349b6c9275aec646eee0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
    }

}
