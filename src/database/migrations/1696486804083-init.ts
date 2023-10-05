import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1696486804083 implements MigrationInterface {
  name = 'Init1696486804083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`region\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`job_posting\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`position\` varchar(255) NOT NULL, \`compensation\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`technical_stack\` varchar(255) NOT NULL, \`company_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`application_history\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` bigint UNSIGNED NOT NULL, \`job_posting_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`, \`user_id\`, \`job_posting_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL COMMENT '사용자 이메일', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`job_posting\` ADD CONSTRAINT \`FK_fe0a1a54625b2dc48cdfb76d6d9\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`application_history\` ADD CONSTRAINT \`FK_ed915fe5b666f8b27c35847f2d7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`application_history\` ADD CONSTRAINT \`FK_b8629f3e5ab92157684c1039415\` FOREIGN KEY (\`job_posting_id\`) REFERENCES \`job_posting\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`application_history\` DROP FOREIGN KEY \`FK_b8629f3e5ab92157684c1039415\``);
    await queryRunner.query(`ALTER TABLE \`application_history\` DROP FOREIGN KEY \`FK_ed915fe5b666f8b27c35847f2d7\``);
    await queryRunner.query(`ALTER TABLE \`job_posting\` DROP FOREIGN KEY \`FK_fe0a1a54625b2dc48cdfb76d6d9\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`application_history\``);
    await queryRunner.query(`DROP TABLE \`job_posting\``);
    await queryRunner.query(`DROP TABLE \`company\``);
  }
}
