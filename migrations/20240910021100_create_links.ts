import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("links", function (table) {
    table.increments();
    table.integer("from").references("id").inTable("pages");
    table.integer("to").references("id").inTable("pages");
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("links");
}
