import { knex as knex_ } from "knex";

export const knex = knex_({
  client: "better-sqlite3",
  connection: {
    filename: "../data/wiki-tracer-ts.sqlite",
  },
  useNullAsDefault: true,
});
