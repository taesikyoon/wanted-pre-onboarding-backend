import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1696408303829 implements MigrationInterface {
  name = 'Init1696408303829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`create-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted-at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL COMMENT '사용자 이메일', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`application-history\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`create-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` bigint UNSIGNED NOT NULL, \`jobPostingId\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`, \`userId\`, \`jobPostingId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`job-posting\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`create-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`position\` varchar(255) NOT NULL, \`compensation\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`technical-stack\` varchar(255) NOT NULL, \`companyId\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`company\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`create-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated-at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted-at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`region\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`application-history\` ADD CONSTRAINT \`FK_c87724e5d763de970bfb43b9ff1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`application-history\` ADD CONSTRAINT \`FK_d60408a658b01dd01b6106e6452\` FOREIGN KEY (\`jobPostingId\`) REFERENCES \`job-posting\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`job-posting\` ADD CONSTRAINT \`FK_eedb07e68447c93de2cf9a9ef4f\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`job-posting\` DROP FOREIGN KEY \`FK_eedb07e68447c93de2cf9a9ef4f\``);
    await queryRunner.query(`ALTER TABLE \`application-history\` DROP FOREIGN KEY \`FK_d60408a658b01dd01b6106e6452\``);
    await queryRunner.query(`ALTER TABLE \`application-history\` DROP FOREIGN KEY \`FK_c87724e5d763de970bfb43b9ff1\``);
    await queryRunner.query(`DROP TABLE \`company\``);
    await queryRunner.query(`DROP TABLE \`job-posting\``);
    await queryRunner.query(`DROP TABLE \`application-history\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
