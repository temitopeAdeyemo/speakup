"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1682597986901 = void 0;
class Migrations1682597986901 {
    constructor() {
        this.name = 'Migrations1682597986901';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2c7319015f4a0223262f1c96d9c"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "accountInfoId" TO "account_info"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_2c7319015f4a0223262f1c96d9c" TO "UQ_6a10aa4bf5ccd04c17bc6b577ca"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6a10aa4bf5ccd04c17bc6b577ca" FOREIGN KEY ("account_info") REFERENCES "account_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6a10aa4bf5ccd04c17bc6b577ca"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_6a10aa4bf5ccd04c17bc6b577ca" TO "UQ_2c7319015f4a0223262f1c96d9c"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "account_info" TO "accountInfoId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2c7319015f4a0223262f1c96d9c" FOREIGN KEY ("accountInfoId") REFERENCES "account_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Migrations1682597986901 = Migrations1682597986901;
