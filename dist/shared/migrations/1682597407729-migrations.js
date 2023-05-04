"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1682597407729 = void 0;
class Migrations1682597407729 {
    constructor() {
        this.name = 'Migrations1682597407729';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "accountInfoId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_2c7319015f4a0223262f1c96d9c" UNIQUE ("accountInfoId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2c7319015f4a0223262f1c96d9c" FOREIGN KEY ("accountInfoId") REFERENCES "account_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2c7319015f4a0223262f1c96d9c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_2c7319015f4a0223262f1c96d9c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accountInfoId"`);
    }
}
exports.Migrations1682597407729 = Migrations1682597407729;
