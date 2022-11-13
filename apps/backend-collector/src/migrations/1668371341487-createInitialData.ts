import { MigrationInterface, QueryRunner } from "typeorm";

export class createInitialData1668371341487 implements MigrationInterface {
    name = 'createInitialData1668371341487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "release_note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "release_note_factory_id" uuid NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "link" character varying NOT NULL, "preview" character varying NOT NULL, "legend" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a357243787d3b8c0f65e9a0c69d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "release_note"`);
    }

}
