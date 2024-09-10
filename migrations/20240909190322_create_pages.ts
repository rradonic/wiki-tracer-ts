import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable("pages", function (table) {
    table.increments();
    table.string("title");
    table.boolean("complete");
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("pages");
}
